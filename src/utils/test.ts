// 校验密码  设置6-16位密码，密码不能全是数字、字母
export const checkPwd = (pwd: string) => /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(pwd)

// 校验银行卡号
export const checkBankCard = (cardNumber: string) => /^([1-9]{1})(\d{15}|\d{18})$/.test(cardNumber)

// 校验手机号（宽松）
export const checkPhone = (phone: string) => /^1[3-9][0-9]{9}$/.test(phone)
