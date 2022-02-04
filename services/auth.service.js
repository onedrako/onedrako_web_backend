const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { config } = require('./../config/config')
const UserService = require('./user.service')
const service = new UserService()

class AuthService {
  async getUser (email, password) {
    const user = await service.findByEmail(email)
    if (!user) {
      throw boom.unauthorized('User or Email are not correct')
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw boom.unauthorized('User or Email are not correct')
    }
    delete user.dataValues.password
    return user
  }

  signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret)
    delete user.dataValues.password
    delete user.dataValues.recoveryToken
    delete user.dataValues.createAt
    delete user.dataValues.updateAt
    return {
      user,
      token
    }
  }

  async sendRecovery (email) {
    const user = await service.findByEmail(email)
    if (!user) {
      throw boom.unauthorized('User or Email are not correct')
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })
    const link = `${config.frontendUrl}/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Recovery password',
      html: `<b> Recovery password link: ${link}`
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await service.findOne(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized('Token is not valid')
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, { password: hash, recoveryToken: null })
    } catch (error) {
      throw boom.unauthorized('Token is not valid')
    }
  }

  async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    })
    await transporter.sendMail(infoMail)
    return { message: 'Email sent successfully' }
  }
}

module.exports = AuthService
