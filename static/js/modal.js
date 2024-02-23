/* files : 업로드 이미지 */
let files;

$('.img_upload').on('dragover', dragOver).on('dragleave', dragOver).on('drop', uploadFiles);

function dragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  if (e.type == 'dragover') {
    $(e.target).css({ 'background-color': 'black', 'outline-offset': '-20px' });
  } else {
    $(e.target).css({ 'background-color': 'gray', 'outline-offset': '-10px' });
  }
}

function uploadFiles(e) {
  e.stopPropagation();
  e.preventDefault();
  dragOver(e);

  e.dataTransfer = e.originalEvent.dataTransfer;
  files = e.target.files || e.dataTransfer.files;
  if (files.length > 1) {
    alert('하나만 올려라.');
    return;
  }
  if (files[0].type.match(/image.*/)) {
    $('#modal1').css({ display: 'none' });

    $('#modal2').css({ display: 'flex' });

    $('#feed_create_button').click(function () {
      alert('업로드');

      let file = files[0];
      let image = files[0].name;
      let content = $('#input_feed_content').val();
      let user_id = '{{ user.nickname }}';
      let profile_image = '{{ user.profile_image }}';

      let fd = new FormData();

      fd.append('file', file);
      fd.append('image', image);
      fd.append('content', content);
      fd.append('user_id', user_id);
      fd.append('profile_image', profile_image);

      $.ajax({
        url: '/content/upload',
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
          location.replace('');
        },
      });
    });

    $('.left_image').css({
      'background-image': 'url(' + window.URL.createObjectURL(files[0]) + ')',
      outline: 'none',
      'background-size': 'contain',
      'background-repeat': 'no-repeat',
      'background-position': 'center',
    });
    const uptext = document.getElementById('upload_text');
    uptext.innerText = '';
  } else {
    alert('이미지가 아닙니다.');
  }
}
