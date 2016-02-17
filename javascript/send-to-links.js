$(document).ready(function () {
    var buildLinks, containerCSS, getCurrentTab, getCurrentVID, getStartIndex, iconCSS, liCSS, linksContainerCSS, ready, scopes, tab, vid;
    scopes = '';
    vid = '';
    tab = '';
    containerCSS = {
        position: 'absolute',
        top: '10px',
        right: '1em'
    };
    liCSS = {
        width: 'auto',
        backgroundColor: 'transparent'
    };
    linksContainerCSS = {
        borderTop: '1px solid #e1e1e1',
        position: 'absolute',
        left: 'auto'
    };
    iconCSS = {
        height: '18px'
    };
    buildLinks = function (record, index) {
        var basketIcon, basketIn, container, linksHTML, recordID, tabParam;
        recordID = record.find('.EXLResultRecordId').attr('id');
        if (tab) {
            tabParam = "&amp;tab=" + tab;
        } else {
            tabParam = "";
        }
        linksHTML = "<div class=\"EXLTabHeaderButtons ndl-sendto-links\">\n  <ul>\n    <li class=\"EXLTabHeaderButtonSendTo\" style=\"list-style-type: none;\"><a title=\"show send to options\" id=\"in" + recordID + "\" name=\"in" + recordID + "\" href=\"#\"><span></span>Export/E-mail <img alt=\"\" src=\"../images/icon_arrow_sendTo.png\"></a>\n      <ol class=\"EXLTabHeaderButtonSendToList\" style=\"display: none;\">\n        <li class=\"EXLButtonSendToMyShelf EXLButtonSendToMyShelfAdd\">\n          <a href=\"" + (addSessionId('basket.do')) + "?fn=create&amp;docs=" + recordID + "&amp;exemode=async\" title=\"Add to Folder\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">Add to Folder</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconMyShelf\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToMyShelf EXLButtonSendToMyShelfRemove\" style=\"display: none;\">\n          <a href=\"" + (addSessionId('basket.do')) + "?fn=remove&amp;docs=" + recordID + "&amp;exemode=async\" title=\"Remove from Folder\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">Remove from Folder</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconMyShelf\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToMail\">\n          <a href=\"" + (addSessionId('email.do')) + "?fn=email&amp;docs=" + recordID + "&amp;vid=" + vid + "&amp;fromCommand=true&amp;doc=" + recordID + "&amp;scope=" + (escape(scopes)) + "&amp;indx=" + index + "&amp;\" title=\"Send record by E-mail(opens in a new window)\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">E-mail</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconMail\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToPrint\">\n          <a href=\"" + (addSessionId('display.do')) + "?fn=print" + tabParam + "&amp;indx=" + index + "&amp;display=print&amp;docs=" + recordID + "&amp;\" title=\"Print record (opens in a new window)\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">Print</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconPrint\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToPermalink\">\n          <a href=\"" + (addSessionId('permalink.do')) + "?docId=" + recordID + "&amp;vid=" + vid + "&amp;fn=permalink\" title=\"Permanent URL for this record\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">Permalink</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconPermalink\"></span></a>\n        </li>\n        <li class=\"EXLButtonSendToCitation\">\n          <a href=\"#\" title=\"Bibliographic citation for this title\" target=\"_blank\">\n          <span class=\"EXLButtonSendToLabel\">Citation</span>\n          <span class=\"EXLButtonSendToIcon EXLButtonSendToIconCitation\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToEndNote\">\n          <a href=\"" + (addSessionId('PushToAction.do')) + "?recId=" + recordID + "&amp;pushToType=EndNote&amp;fromEshelf=false\" title=\"Add to EndNote\" target=\"_blank\">\n            <span class=\"EXLButtonSendToLabel\">\n              EndNote</span>\n            <span class=\"EXLButtonSendToIcon EXLButtonSendToIconEndNote\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToRefWorks\">\n          <a href=\"" + (addSessionId('PushToAction.do')) + "?recId=" + recordID + "&amp;pushToType=RefWorks&amp;fromEshelf=false\" title=\"Add to RefWorks\" target=\"_blank\">\n            <span class=\"EXLButtonSendToLabel\">\n              RefWorks</span>\n            <span class=\"EXLButtonSendToIcon EXLButtonSendToIconRefWorks\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToDelicious\">\n          <a href=\"" + (addSessionId('PushToAction.do')) + "?recId=" + recordID + "&amp;pushToType=Delicious&amp;fromEshelf=false\" title=\"Add to Delicious\" target=\"blank\">\n            <span class=\"EXLButtonSendToLabel\">\n              del.icio.us</span>\n            <span class=\"EXLButtonSendToIcon EXLButtonSendToIconDelicious\"></span>\n          </a>\n        </li>\n        <li class=\"EXLButtonSendToRIS\">\n          <a href=\"" + (addSessionId('PushToAction.do')) + "?recId=" + recordID + "&amp;pushToType=RISPushTo&amp;fromEshelf=false\" title=\"Add to RISPushTo\" target=\"_blank\">\n            <span class=\"EXLButtonSendToLabel\">\n              Export RIS</span>\n            <span class=\"EXLButtonSendToIcon EXLButtonSendToIconRISPushTo\"></span>\n          </a>\n        </li>\n      </ol>\n    </li>\n  </ul>\n</div>";
        container = $(linksHTML);
        container.css(containerCSS);
        container.find('.EXLTabHeaderButtonSendTo').css(liCSS);
        container.find('.EXLTabHeaderButtonSendToList').css(linksContainerCSS);
        container.find('li span').css(iconCSS);
        container.find('.EXLButtonSendToMyShelfAdd a').click(function (event) {
            event.preventDefault();
            return eshelfCreate(this, recordID, 'false', scopes, "" + index);
        });
        container.find('.EXLButtonSendToMyShelfRemove a').click(function (event) {
            event.preventDefault();
            return eshelfRemove(this, recordID, 'false', scopes, "" + index);
        });
        container.find('.EXLButtonSendToMail a').click(function (event) {
            event.preventDefault();
            return sendPrintPopOut(this);
        });
        container.find('.EXLButtonSendToPrint a').click(function (event) {
            event.preventDefault();
            return sendPrintPopOut(this);
        });
        container.find('.EXLButtonSendToPermalink a').click(function (event) {
            event.preventDefault();
            return openPermaLinkLbox('permalink', "docId=" + recordID + "&amp;vid=" + vid + "&amp;fn=permalink", "" + (index - 1), recordID);
        });
        container.find('.EXLButtonSendToCitation a').click(function (event) {
            event.preventDefault();
            return openCitationLbox("" + (index - 1), recordID);
        });
        container.find('.EXLButtonSendToEndNote a').click(function (event) {
            event.preventDefault();
            return pushto('EndNote', "" + index, 'false', recordID);
        });
        container.find('.EXLButtonSendToRefWorks a').click(function (event) {
            event.preventDefault();
            return pushto('RefWorks', "" + index, 'false', recordID);
        });
        container.find('.EXLButtonSendToRIS a').click(function (event) {
            event.preventDefault();
            return pushto('RISPushTo', "" + index, 'false', recordID);
        });
        record.find('.EXLSummaryFields').after(container);
        basketIn = 'off';
        basketIcon = record.find('.EXLMyShelfStar img');
        if (basketIcon.length > 0) {
            if (/on[.]png/.test(basketIcon.attr('src'))) {
                basketIn = 'on';
            }
        } else {
            if (record.find('.EXLButtonSendToMyShelfRemove').is(':visible')) {
                basketIn = 'on';
            }
        }
        return ineshelfInit(recordID, basketIn);
    };
    getCurrentVID = function () {
        var $vid;
        $vid = $('#vid');
        if ($vid.length === 0) {
            $vid = $('#vid_browse_input');
        }
        return $vid.val();
    };
    getCurrentTab = function () {
        return $('#tab').val();
    };
    getStartIndex = function () {
        var indexVal;
        indexVal = $('#indx').val();
        if (indexVal) {
            return parseInt(indexVal);
        } else {
            return 1;
        }
    };
    ready = function () {
        var startIndex;
        scopes = $('#scopesListContainer').find('input:checked').val();
        vid = getCurrentVID();
        tab = getCurrentTab();
        startIndex = getStartIndex();
        return $('.EXLResult').each(function (index, element) {
            var record;
            record = $(this);
            return buildLinks(record, index + startIndex);
        });
    };
    return $(document).ready(ready);
});

$(window).load(function () {


    $('.EXLTabHeaderButtonSendTo').click(function (event) {
        event.preventDefault();

        event.stopPropagation();

        var currentmenu = $(this).children('.EXLTabHeaderButtonSendToList');

        if (!currentmenu.is(':visible')) {
            currentmenu.show();
        } else {
            currentmenu.hide();
        }


    });

    $('.EXLResultAvailability').each(function () {

        if ($(this).css('display') == 'none') {
            $(this).closest('.EXLSummary').find('.EXLTabHeaderButtonSendTo').hide();
        }

    });



    $(document).on("click touchstart", function (event) {
        $('.EXLTabHeaderButtonSendToList').hide();
    });
});