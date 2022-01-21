const dateFormat = require("dateformat");
var crypto = require('crypto');
var algorithm = 'aes256';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

class halper {

	created_at(now = null) {
    if (now) {
      return dateFormat(now, 'yyyy-mm-d H:MM:ss');
    } else {
      let now = new Date();
      return dateFormat(now, 'yyyy-mm-d H:MM:ss');
    }
  }

	get_role_id(input){
			let role_id = {
				user:1,
				broker:2
			}
			if (typeof input != "string"){
				return Object.keys(role_id).find(key => role_id[key] === input);
			}else{
				return role_id[input];
			}
		}
		
	encrypt(text,type) {
			if(type == 'dec') {
				const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv.toString('hex'), 'hex'));
				const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);

				return decrpyted.toString();
			}else {
				const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    		const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
				return encrypted.toString('hex');
			}
	}

	
	find_one(inputArray, my_key = null) {
		let response = Object();
		if (inputArray.length) {
		  response = inputArray.find(Boolean);
		  if (my_key) {
			return response[my_key];
		  }
		}
		return response;
	  }
	  
	  check_obj(myObj, key = null) {
		if (key) {
		  return myObj.hasOwnProperty(key) ? true : false;
		} else {
		  return myObj && // 👈 null and undefined check
			Object.keys(myObj).length === 0 &&
			Object.getPrototypeOf(myObj) === Object.prototype
			? false
			: true;
		}
	  }
  
  
	api_response(status,message,data){
		
		return {
			status : status,
			message : message,
			data : data
		};
	}
	
	
	empty_array(obj){
		   let result =  Object.entries(obj).reduce((a,[k,v]) => (v == '' ? a : (a[k]=v, a)), {});
		   return result;
	}

}

module.exports = new halper();