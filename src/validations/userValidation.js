import * as yup from 'yup';

export const userSchema =yup.object().shape({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().min(4).max(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null])
})


export const createHotelSchema=yup.object().shape({
    name:yup.string().required(),
    type:yup.string().required(),
    city:yup.string().required().min(3).max(10)
})

export const handleNameChange = (value) => {
    if (!value.match(/^[a-zA-Z]{3,16}$/)) {
        setNameError(true)
    } else {
        setNameError(false)
        setUsername(value);
    }
}

export const handleEmailChange = (value) => {
    if (!value.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
        setEmailError(true)
    } else {
        setEmailError(false)
        setEmail(value);
    }
}

export const handleMobileChange = (value) => {
    if (!value.match(/^\d{10}$/)) {
        setMobileError(true)
    } else {
        setMobileError(false)
        setMobile(value);
    }
}

export const handlePasswordChange = (value) => {
    if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
        setPasswordError(true)
    } else {
        setPasswordError(false)
        setPassword(value);
    }
}

export const handleCPasswordChange = (value) => {
    if (value !== password) {
        setCPasswordError(true)
    } else {
        setCPasswordError(false)
        setConfirmPassword(value);
    }
}

export const handleHotelName = (value) => {
    if (!value.match(/^[a-zA-Z]{3,16}$/)) {
        setCPasswordError(true)
    } else {
        setCPasswordError(false)
        setConfirmPassword(value);
    }
}