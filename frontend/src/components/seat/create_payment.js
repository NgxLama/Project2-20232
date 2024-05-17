import dateFormat from 'dateformat';
import QueryString from 'qs';
import { HmacSHA512, enc } from 'crypto-js';

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export const create_payment_url = (pay) => {
    var ipAddr = '192.168.1.1';
    
    var tmnCode = 'J4C4PZ9N';
    var secretKey = 'CM9GZYXQVOYNILPP2D5GO1QN15P1YIE9';
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = 'http://localhost:3000/return_url';

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = dateFormat(date, 'HHmmss');
    var amount = pay.amount;

    var orderInfo = 'Thanh toan ve xem phim';
    var orderType = 'other';
    var locale = 'vn';
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = sortObject(vnp_Params);

    var signData = QueryString.stringify(vnp_Params, { encode: false });
    var hmac = HmacSHA512(signData, secretKey);
    var signed = hmac.toString(enc.Hex);
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });

    console.log(vnpUrl);
    //window.location.href = vnpUrl;
}