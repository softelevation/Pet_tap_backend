class MailTemplate {
  forgot_password(input) {
    let dssss = '<!DOCTYPE html><html><head><title>Be On Time</title>';
    dssss += '<style type="text/css">';
    dssss +=
      '.table{width: 100%; border: solid 1px #ccc; border-collapse: collapse; font-family: sans-serif; }';
    dssss += '.table td{padding: 8px 15px; }';
    dssss +=
      '</style></head><body><div style="width: 100%; text-align: center;"><center>';
    dssss += '<div style="width: 500px;">';
    dssss +=
      '<h4 style="font-family: sans-serif; background: #ffc107; margin: 0; text-transform: uppercase; padding: 11px; font-weight: 600;">Reset password</h4>';
    dssss +=
      '<div style="width: 500px;"><p>Click <a style="color: blue;" href="' +
      input +
      '">Here</a> for reset your password</p></div>';
    dssss +=
      '<h5 style="font-family: sans-serif; background: #ffc107; margin: 0;  padding: 10px; font-weight: 600;">Be On Time</h5>';
    dssss += '</div></center></div></body></html>';

    return dssss;
  }

  user_registration(inputData) {
    let dssss = '<!DOCTYPE html><html><head><title>Medicaar</title>';
    dssss += '<style type="text/css">';
    dssss +=
      '.table{width: 100%; border: solid 1px #ccc; border-collapse: collapse; font-family: sans-serif; }';
    dssss += '.table td{padding: 8px 15px; }';
    dssss +=
      '</style></head><body><div style="width: 100%; text-align: center;"><center>';
    dssss += '<div style="width: 500px;">';
    dssss +=
      '<h4 style="font-family: sans-serif; background: #3b8160; margin: 0; text-transform: uppercase; padding: 11px; font-weight: 600;">Pet tap</h4>';
    dssss +=
      '<div style="width: 500px;"><p>Dear Admin, <br>Someone has lost his pet. The phone number attached to the tag of the pet is ' +
      inputData +
      ' <br><br>Thanks,</b><br><br>Team Pettap.</b></p></div>';
    dssss +=
      '<h5 style="font-family: sans-serif; background: #3b8160; margin: 0;  padding: 10px; font-weight: 600;"></h5>';
    dssss += '</div></center></div></body></html>';
    return dssss;
  }

  agent_verification_message(inputData) {
    let dssss = '<!DOCTYPE html><html><head><title>Be On Time</title>';
    dssss += '<style type="text/css">';
    dssss +=
      '.table{width: 100%; border: solid 1px #ccc; border-collapse: collapse; font-family: sans-serif; }';
    dssss += '.table td{padding: 8px 15px; }';
    dssss +=
      '</style></head><body><div style="width: 100%; text-align: center;"><center>';
    dssss += '<div style="width: 500px;">';
    dssss +=
      '<h4 style="font-family: sans-serif; background: #ffc107; margin: 0; text-transform: uppercase; padding: 11px; font-weight: 600;">Agent Registration</h4>';
    dssss +=
      '<div style="width: 500px;"><p>Hello <b>' + inputData.first_name +
      '</b><br>Agent has been registered successfully. You will receive an email for your login credentials, once your details get verified by operator.' +
      ' <br><br>Thanks,</b></p></div>';
    dssss +=
      '<h5 style="font-family: sans-serif; background: #ffc107; margin: 0;  padding: 10px; font-weight: 600;">Be On Time</h5>';
    dssss += '</div></center></div></body></html>';
    return dssss;
  }
}

module.exports = new MailTemplate();