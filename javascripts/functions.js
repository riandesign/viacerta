var hasAddedIdDoc = false;

// $(function () {
$(document).ready(function () {

  // Boostrap tooltip =====================
  $('[data-toggle="tooltip"]').tooltip();

  // Customer info card =====================
  var isCustomerInfoOpen = false;

  $('.customer-card__view-more').click(function() {
    if (isCustomerInfoOpen === false) {
      $('.customer-card .cell-to-hide').slideDown();
      $(this).html('Ver menos').addClass('customer-card__view-more--view-less');
      isCustomerInfoOpen = true;
    } else {
      $('.customer-card .cell-to-hide').slideUp();
      $(this).html('Ver mais').removeClass('customer-card__view-more--view-less');
      isCustomerInfoOpen = false;
    }
  });



  // Addition proposal files on Form =====================

  var countAdditionalFiles = 0;

  $('[name="add_document_file"]').click(function () {
    var file = $('#proposalAdditionalFile')[0].files[0];
    var fileType = $('#proposalAdditionalFileType').children("option:selected").val();

    if (fileType == '') {
      alert('Por favor, selecione o tipo de arquivo');
      return false;
    }

    var newFile = `
      <li class="additional-documents__files__item">
        <a href="#" onclick="alert('Função não disponível para este protótipo.'); return false;">
          <span class="additional-documents__files__item__name">` + fileType + `</span>
          <span>(` + file.name + `)</span>
        </a>
        <div class="additional-documents__files__item__remove" href="#" data-toggle="tooltip" data-placement="top" title="Excluir arquivo"></div>
      </li>
    `;

    $('#additionalFiles ul').append(newFile);

    countAdditionalFiles++;
    checkIfThereAreFiles(countAdditionalFiles);

    $('#proposalAdditionalFile').val('');
    $('#proposalAdditionalFileType').prop('selectedIndex',0);

    // User added an ID document
    if (fileType == "Identidade") {
      hasAddedIdDoc = true;
    }

    resetBootstrapTooltip();
    return false;
  });



  $('#additionalFiles').on('click', '.additional-documents__files__item__remove', function() {
    $(this).closest('li').hide();
    countAdditionalFiles--;
    checkIfThereAreFiles(countAdditionalFiles);
  });


  function checkIfThereAreFiles(count) {
    if (count > 0) {
      $('#additionalFiles').show();
    } else {
      $('#additionalFiles').hide();
    }
  }







})


// Reset Bootstrap tooltip – Useful after appeding an element
function resetBootstrapTooltip() {
  $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
}
