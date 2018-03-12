$(function () {
    'use strict';

    //if it's in the angular app, exit out since we don't need the other events
    if ($('ups-electronic-return').length > 0) {
        return;
    }

    /*var tileViewOpened = false;

    function closeTileView(tid) {
        if (tileViewOpened == true) {
            $(tid).slideUp(200);
        } else {
            $(tid, tid + ' .ups-toggle_view_content').hide();
        }
    }*/

    /*
        initial hiding
    */
    $('#printTileView, #printTileView .ups-toggle_view_content').hide();
    $('#emailTileView, #emailTileView .ups-toggle_view_content').hide();
    $('#syncStickerTileView, #syncStickerTileView .ups-toggle_view_content').hide();

    $('#emailSuccessContainer').hide();
    $('#barcodeSuccessContainer').hide();

    /*
        main buttons
    */
    $('#printLabelBtn').click(function () {
        $(this).attr('aria-expanded', true);
        $('#emailLabelBtn').attr('aria-expanded', false);
        $('#syncStickerBtn').attr('aria-expanded', false);

        $('#emailTileView, #emailTileView .ups-toggle_view_content').hide();
        $('#syncStickerTileView, #syncStickerTileView .ups-toggle_view_content').hide();
        $('#printTileView').show().children('.ups-toggle_view_content').slideDown(200);
    });

    $('#emailLabelBtn').click(function () {
        $(this).attr('aria-expanded', true);
        $('#printLabelBtn').attr('aria-expanded', false);
        $('#syncStickerBtn').attr('aria-expanded', false);

        $('#syncStickerTileView, #syncStickerTileView .ups-toggle_view_content').hide();
        $('#printTileView, #printTileView .ups-toggle_view_content').hide();
        $('#emailTileView').show().children('.ups-toggle_view_content').slideDown(200);
    });

    $('#syncStickerBtn').click(function () {
        $(this).attr('aria-expanded', true);
        $('#emailLabelBtn').attr('aria-expanded', false);
        $('#syncStickerBtn').attr('aria-expanded', false);

        $('#emailTileView, #emailTileView .ups-toggle_view_content').hide();
        $('#printTileView, #printTileView .ups-toggle_view_content').hide();
        $('#syncStickerTileView').show().children('.ups-toggle_view_content').slideDown(200);
    });

    /*
        Sub button actions
    */
    $('#emailSubmitBtn').click(function () {
        $('#emailEntryContainer').hide();
        $('#emailSuccessContainer').show();
    });

    $('#barcodeSubmitBtn').click(function () {
        $('#barcodeEntryContainer').hide();
        $('#barcodeSuccessContainer').show();
    });

    /*
        close button clicks on tile views
    */
    $('#closeEmailTileViewBtn, #closeBarcodeTileViewBtn').click(function () {
        $('#printLabelBtn').attr('aria-expanded', false);
        $('#emailLabelBtn').attr('aria-expanded', false);
        $('#syncStickerBtn').attr('aria-expanded', false);

        $('#printTileView .ups-toggle_view_content').slideUp(200, function () {
            $('#printTileView').hide();
        });

        $('#emailTileView .ups-toggle_view_content').slideUp(200, function () {
            $('#emailTileView').hide();
        });

        $('#syncStickerTileView .ups-toggle_view_content').slideUp(200, function () {
            $('#syncStickerTileView').hide();
        });
    });
});
