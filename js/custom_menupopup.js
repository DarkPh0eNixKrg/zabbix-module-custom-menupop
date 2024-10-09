function copyToClipboard(data) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(data)
    } else {
        let input = document.createElement('textarea');
        input.value = data;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
}

function copyHostIPToClipboard(hostid) {
    let curl = new Curl('zabbix.php');
    curl.setArgument('action', 'gethostip');
    fetch(curl.getUrl(), {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        body: urlEncodeData({hostid: hostid})
    })
    .then(response => response.text())
    .then(result => copyToClipboard(result))
}

window.addEventListener('load', e => {
    if (window.getMenuPopupHost) {
        const originalGetMenuPopupHost = getMenuPopupHost;
        getMenuPopupHost = function(options, trigger_element) {
            response = originalGetMenuPopupHost(options, trigger_element)
            if (response.find(obj => obj.label != 'Test')) {
                // add menu to top popupmenu
                response.unshift({
                // add menu to botom popupmenu
                //response.push({
                    label: t('Tools'),
                    items: [{
                        label: t('Copy'),
                        items: [{
                            label: t('IP address'),
                            clickCallback: function () {
                                copyHostIPToClipboard(options.hostid);
                            },
                            disabled: false
                        }]
                    }]
               })
            }
        return response
        }
    }
})
