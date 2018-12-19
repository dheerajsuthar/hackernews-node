const token = require('jsonwebtoken');

const JWT_KEY = "arUf22QaWCgfjuKnt08UzX7MbpVXqzGGODIzarU9eKRvQZ17YSwvxcm-WbsNC8h3Kc_VFndAhjpP4EqmtpeBPsIFfodkdl_RCk01n5ZmKSkncfke6jvuWB7quRa4zGGlIEHSk3O_TV2ykIgLbD90EtvsjYGSgq1XCGkC758XgOUGbcC9nF6AwxnsP7oklUMc37e7f2RNV047MDhJIxNX0JzPSRmTqSwpOLKi20KxGvdFp16nyumuCwCj-cLe8PPBI-V6WM3OklAlvXHGSagG66eAfb_QNE3PxkrVGeKB3tqQE2KWVL3kLQDtofJ4P1AfXIy3S0GCIcEjgGtjcJqHkQ";

const l = console.log;

const getUserIdFromToken = async (context) => {
    const auth = context.request.get('Authorization').replace('Bearer ', '');
    l(auth);
    return await token.verify(auth, JWT_KEY);
}

module.exports = {
    l,
    JWT_KEY,
    getUserIdFromToken
}