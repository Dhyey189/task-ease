import setWithExpiry from "./SetWithExpiry"

const storeUser = (user) => {
    setWithExpiry("user",user,300000*12)
}

export default storeUser