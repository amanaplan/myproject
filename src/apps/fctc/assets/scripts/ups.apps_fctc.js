$(function () {
    $('#extLengthContainer').hide();
    
    $('#extLength').change(function () {
        if ($(this).is(':checked')) {
            $('#extLengthContainer').show();
        } else {
            $('#extLengthContainer').hide();
        }
    })
});
