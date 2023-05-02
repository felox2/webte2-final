import kyclient from 'ky'

const ky = kyclient.create({
    prefixUrl: import.meta.env.VITE_API_URL,
})

export default ky
