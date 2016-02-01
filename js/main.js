$(document).ready(function () {
    /*/settings/*/
    $.InfoBox({
        insertTo: $('#info_box_wrapper'), /* wrapper, where module creates html */
        pathData: 'json/info_box.json', /* path to content*/
        itemClass: 'main',
        skinClass: 'orangeSkin', /* skin - for style (can be orangeSkin/greenSkin)  */
        showDetailsText: 'show details',
        hideDetailsText: 'hide details',
        btnNextText: 'Next',
        btnPrevText: 'Prev',
        btnFindText: 'Find A Store',
        parentWidth: 350, /* value only in px */
        parentHeight: 350, /* value only in px */
        animateDelay: 1000 /* value in milliseconds */
    })
});
