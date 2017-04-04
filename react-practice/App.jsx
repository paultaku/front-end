import React from 'react';
import { Well, Button, Nav, NavItem, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

const App = React.createClass ({
    getInitialState() {
        return {
          url: 'https://www.costco.com.tw/Computers-%26-Office/Laptops/HP-13-3%22-ENVY-NB-13-ab041TU/p/113967',
        };
    },
    getValidationState() {
        var pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i; // fragment locater
        if(this.state.url !== ""){
            console.log(pattern.test( this.state.url));
            if(!pattern.test( this.state.url)) {
                return "error";
            } else {
                return "success";
            }
        }
        return;    
    },
    handleChange(e) {
        this.setState({ url: e.target.value });
    },
    getProductDetail(){
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/cosco/',
            data: {
                url: this.state.url
            },
            crossDomain: true,
            dataType: 'json',
        })
        .done(function(data) {
            self.clearForm()
        })
        .fail(function(jqXhr) {
            console.log('failed to register');
        });
    },
    formSubmit(e){
        this.getProductDetail();
    },
    render() {
        return (
            <Well bsSize="sm">
                <form>
                    <FormGroup
                        bsSize="sm"
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>連結網址:</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.url}
                            placeholder="請輸入商品網址連結"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        type="button"
                        bsStyle="primary"
                        onClick={this.formSubmit}
                    >提交</Button>
                </form>
            </Well>
        );
    }
});
export default App;