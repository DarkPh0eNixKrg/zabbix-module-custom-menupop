# Thanks
Many thanks to [BGmot git](https://github.com/BGmot) for his modules

# zabbix-module-custom-menupop
Written according to Zabbix official documentation [Modules](https://www.zabbix.com/documentation/current/en/devel/modules/file_structure)

A module for Zabbix to customazing your **Popup menu (context menu)**

![Screenshot](/screenshots/zabbix-module-custom-menupop.png)

To add *Name of Main menu* to top `response.unshift` or `response.push` to botom side of popupmenu

Example
```
response.unshift({
    label: t('Name of Main menu'),
    items: [{...}]
})
```
To add items at menu
```
response.unshift({
    label: t('Name of Main menu'),
    items: [{
        label: t('Copy'),
        items: [{...}]
    }]
})
```
Look at the original [js/menupopup.js](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/ui/js/menupopup.js?at=refs%2Fheads%2Frelease%2F6.0) of Zabbix UI to understand how create menu items and actions when user click item

To work current version of module need install module [GetHostIP](https://github.com/DarkPh0eNixKrg/zabbix-module-get-host-ip) or modify **js/custom_menu popup.js**

**Remove**
```
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
```
**Replace**
```
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
```
to
```
label: t('Tools'),
items: [{
    label: t('Copy'),
    items: [{
        label: t('IP address')
    }]
```
