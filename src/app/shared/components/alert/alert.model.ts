export class AlertMessage {
    message = '';
    dismissible = false;
    type = 'danger';
    autoClose = false;

    public AlertMessage(_message: string,
        _dismissible: boolean,
        _showIcon: boolean,
        _type: string,
        _autoClose: boolean) {
        this.message = _message;
        this.dismissible = _dismissible;
        this.type = _type;
        this.autoClose = _autoClose;
    }
}
