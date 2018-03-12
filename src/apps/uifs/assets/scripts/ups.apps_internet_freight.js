$(function () {
    $('#extLengthContainerFreight').hide();
    
    $('#extLengthFreight').change(function () {
        if ($(this).is(':checked')) {
            $('#extLengthContainerFreight').show();
        } else {
            $('#extLengthContainerFreight').hide();
        }
    })
});
