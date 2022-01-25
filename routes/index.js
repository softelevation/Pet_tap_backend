var express = require('express');
var db = require('../db1');
const halper = require('../halpers/halper');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', async function (req, res, next) {
	return res.render('testing.ejs');
	// res.render('testing');
});
	
router.get('/profile/:pet_id', async function(req, res, next) {
  let pet_id = req.params.pet_id;
  const qb = await db.get_connection();
	  try {
		  let response = {}
		  const recent_count = await qb.select('*').where('pet_id', pet_id).limit(1).from(`pet_tags`).get();
		  if(recent_count.length > 0){
				response = recent_count[0];
				const pets = await qb.select(['unique_id AS id','pets_name','pets_breed','pets_address','owners_phone','notes_about_me','photo','status','lat','lng','created_at','updated_at']).where('unique_id', response.pet_id).limit(1).from(`pets`).get();
				response.pet = pets[0];
				console.log(response);
				res.render('profile', { 
							title: 'Express',
							name: response.pet.pets_name,
							pet_images: `./../${response.pet.photo}`,
							owners_phone: `tel:${response.pet.owners_phone}`,
							notes_about_me: response.pet.notes_about_me,
							pets_breed: response.pet.pets_breed,
							owners_phone_message: `sms://${response.pet.owners_phone}`,
							pettap_link: `pettap://app/pet-details/${pet_id}`,
							pettap_map_link:`https://www.google.com/maps/?q=${response.pet.lat},${response.pet.lng}`
							
				});
		  }else{
				return res.status(200).json(
					halper.api_response(0, 'Tag id does not exits', {}),
				);
		  }
	  } catch (err) {
		return res.json(halper.api_response(0, 'This is invalid request', err));
	  } finally {
		qb.disconnect();
	  }
  
});


module.exports = router;
