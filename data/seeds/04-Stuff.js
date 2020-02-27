exports.seed = function(knex) {
  return knex('Stuff').insert([
    {
      //id: 1,
      category_id: 1,
      Title: 'Canon EOS M5 Mirrorless Digital Camera',
      Description: '24.2MP APS-C CMOS Sensor\nDIGIC 7 Image Processor\n2.36m-Dot EVF, Touch and Drag AF Control\n3.2" 1.62m-Dot Tilting Touchscreen LCD',
      condition_id: 3,
      AddDate: knex.fn.now(),
      PricePerHour: 30,
      PricePerDay: 150,
      Available: 1,
      ImagePath: 'https://i.pcmag.com/imagery/reviews/03iFcrjLxMoN78LEuDRnCfd-16.fit_scale.size_1028x578.v_1569473622.jpg'
    },
    {
      //id: 2,
      category_id: 2,
      Title: 'Vivitek DU978-WT DLP Projector',
      Description: 'High brightness (5000 lumens) WUXGA (1920x1200) native resolution multimedia projector, with Full 3D capability.',
      condition_id: 2,
      AddDate: knex.fn.now(),
      PricePerHour: 85,
      PricePerDay: 250,
      Available: 0,
      ImagePath: 'https://www.vivitekusa.com/_imagegallery/10fccc5a-6450-4144-ab19-c62c286b25c9/DU978-WT_02.jpg'
    },
    {
      //id: 3,
      category_id: 5,
      Title: 'Denon DJ VL12 Prime - Professional Direct Drive Turntable',
      Description: 'The Denon DJ VL12 Prime is a professional high-torque, direct drive turntable with true quartz lock and optimal acoustic isolation capabilities that can withstand loud, bass heavy environments. The isolated motor design provides an excellent signal-to-noise ratio, while the S-shaped tone arm offers accurate tracking. An "easy grip/brake" chamfered platter offers a refined tactile DJ touch, enabling direct and subtle adjustments to your vinyl mix.\n\nThe rugged all metal tone arm base and high-quality brushed metal controls can withstand the rigors of touring and club environments. A 100mm pitch adjustment fader adjusts smoothly for elegant beat matching with ±8, 16, and 50% settings and a reset button to quickly get you back to 33-1/3 or 45 RPMs. The deck includes a pair of stereo RCA outputs and a ground lock, allowing for flexibility in length and quality of interconnect cables. Also included is a fully programmable platter light ring that can be set to a multitude of colors, with adjustable brightness and a ‘lights-out’ mode as well. The VL12 ships with a 45 RPM adapter.',
      condition_id: 4,
      AddDate: knex.fn.now(),
      PricePerHour: 10,
      PricePerDay: 50,
      Available: 1,
      ImagePath: 'https://static.bhphoto.com/images/images2500x2500/1484300739_1310962.jpg'
    },
  ]);
};
