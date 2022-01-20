// var db = require('../db');
var db = require('../db1');
const jwt = require('jsonwebtoken');
const dateFormat = require("dateformat");
const halper = require('../halpers/halper');
var multer  = require('multer');
const { promisify } = require('util');
const { sand } = require('../trait/mail');

const accessTokenSecret = 'youraccesstokensecret';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/pets/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
var upload = multer({ storage: storage }).single('photo');




async function okkkkkkkkkkkk(input) {
  try {
	
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const creds = require('./../healthy-wares-327509-5cc576ff49ec.json');
    const doc = new GoogleSpreadsheet(creds.google_GoogleSpreadsheet);
	
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });

    // console.log(input);
	
    await doc.loadInfo(); // loads document properties and worksheets
	
	// console.log(doc.title);
  // console.log('222222222222');
	
    const sheet = doc.sheetsByIndex[0];
    const larryRow = await sheet.addRow({
      Pets_Name: input.pets_name,
      Pets_Breed: input.pets_breed,
      Pets_Address: input.pets_address,
      Suburb: input.Suburb,
      Post_Zip_Code: input.post_Zip_Code,
      State: input.state,
      Owners_Phone: input.owners_phone,
      Owners_Email: input.owners_email ? input.owners_email : '',
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}


async function get_extra_field_from_address(input) {
  const NodeGeocoder = require('node-geocoder');
  const creds = require('./../healthy-wares-327509-5cc576ff49ec.json');
  const options = {
    provider: 'google',
    apiKey: creds.google_apiKey, // for Mapquest, OpenCage, Google Premier
    formatter: null, // 'gpx', 'string', ...
  };
  const geocoder = NodeGeocoder(options);
  const resssssss = await geocoder.geocode(input.pets_address);
  input.post_Zip_Code = (resssssss[0].zipcode) ? resssssss[0].zipcode : '';
  input.Suburb = (resssssss[0].city) ? resssssss[0].city : resssssss[0].administrativeLevels.level2short;
  input.state = (resssssss[0].administrativeLevels.level1long) ? resssssss[0].administrativeLevels.level1long : '';
  okkkkkkkkkkkk(input);
  return true;
}


class userController {
  async registered(req, res, next) {
    const qb = await db.get_connection();
    try {
      let inputData = req.body;
      const rndInt = Math.floor(Math.random() * 999999999) + 1;
      if (inputData.photo) {
        let base64Data = inputData.photo.replace(
          /^data:image\/png;base64,/,
          '',
        );
        let agent_signature = 'pets/pets_name_' + rndInt + '.png';
        require('fs').writeFile(
          'public/' + agent_signature,
          base64Data,
          'base64',
          function (err) {},
        );
        inputData.photo = agent_signature;
      }
      inputData.created_at = halper.created_at();
      inputData.updated_at = halper.created_at();
      // this.google_sheet(inputData);
      // console.log(inputData);
      let result = await qb.insert('pets', inputData);
      get_extra_field_from_address(inputData);
      inputData.id = halper.encrypt(result.insert_id.toString(), 'in');
      qb.update('pets', { unique_id: inputData.id }, { id: result.insert_id });
      return res
        .status(200)
        .json(halper.api_response(1, 'pets insert successfully', inputData));
    } catch (err) {
      return res.json(halper.api_response(0, 'This is invalid request', err));
    } finally {
      qb.disconnect();
    }
  }

  async requestPost(req, res, next) {
    const qb = await db.get_connection();
    try {
      let input = req.body.phone_no;
      sand('aman1921@yopmail.com', 'testing user', `this is my ${input}`);
      let return_data = { pdf: '/pdffile/pet_tap.pdf' };
      return res
        .status(200)
        .json(halper.api_response(1, 'Tags assign successfully', return_data));
    } catch (err) {
      return res.json(halper.api_response(0, 'This is invalid request', err));
    } finally {
      qb.disconnect();
    }
  }

  async assignTag(req, res, next) {
    const qb = await db.get_connection();
    try {
      let input = req.body;
      input.created_at = halper.created_at();
      input.updated_at = halper.created_at();
      qb.insert('pet_tags', input);
      return res
        .status(200)
        .json(halper.api_response(1, 'Tags assign successfully', input));
    } catch (err) {
      return res.json(halper.api_response(0, 'This is invalid request', err));
    } finally {
      qb.disconnect();
    }
  }

  async pettagAll(req, res, next) {
    const qb = await db.get_connection();
    try {
      const pets = await qb
        .select([
          'unique_id AS id',
          'pets_name',
          'pets_breed',
          'pets_address',
          'owners_phone',
          'notes_about_me',
          'photo',
          'status',
          'lat',
          'lng',
          'pets.created_at',
          'pets.updated_at',
        ])
        .where('pets.status', 1)
        .from(`pets`)
        .join('pet_tags', 'pet_tags.pet_id=pets.unique_id')
        .get();
      // let pets_frm = pets.map(function(response){
      // 			response.id = halper.encrypt(response.id.toString(),'in');
      // 			return response;
      // });
      return res.status(200).json(halper.api_response(1, 'All pets', pets));
    } catch (err) {
      return res.json(halper.api_response(0, 'This is invalid request', err));
    } finally {
      qb.disconnect();
    }
  }

  async pettag(req, res, next) {
    const qb = await db.get_connection();
    try {
      let tag_id = req.params.id;
      let response = {};
      const recent_count = await qb
        .select('*')
        .where('pet_id', tag_id)
        .limit(1)
        .from(`pet_tags`)
        .get();
      console.log(recent_count);
      if (recent_count.length > 0) {
        response = recent_count[0];
        const pets = await qb
          .select([
            'unique_id AS id',
            'pets_name',
            'pets_breed',
            'pets_address',
            'owners_phone',
            'notes_about_me',
            'photo',
            'status',
            'lat',
            'lng',
            'created_at',
            'updated_at',
          ])
          .where('unique_id', response.pet_id)
          .limit(1)
          .from(`pets`)
          .get();
        response.pet = pets[0];
        return res
          .status(200)
          .json(halper.api_response(1, 'Tags get successfully', response));
      } else {
        return res
          .status(200)
          .json(halper.api_response(0, 'Tag id does not exits', {}));
      }
    } catch (err) {
      return res.json(halper.api_response(0, 'This is invalid request', err));
    } finally {
      qb.disconnect();
    }
  }

  async google_sheet(req, res, next) {
    try {
      return res.json('qqqqqqqqqqqqqqqqqq');
    } catch (err) {
      return false;
    }
  }
}

module.exports = new userController();