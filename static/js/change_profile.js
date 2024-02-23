$('#button_profile_upload').click(function () {
  $('#input_fileupload').click();
});

function profile_upload() {
  let file = $('#input_fileupload')[0].files[0];
  let email = '{{ user.email }}';

  let fd = new FormData();

  fd.append('file', file);
  fd.append('email', email);

  $.ajax({
    url: '/user/profile/upload',
    data: fd,
    method: 'POST',
    processData: false,
    contentType: false,
    success: function (data) {
      console.log('성공');
    },
    error: function (request, status, error) {
      console.log('에러');
    },
    complete: function () {
      console.log('완료');
      location.replace('/content/profile');
    },
  });
}
