import React from 'react';
import { withRouter } from "react-router-dom";
import './styles.scss';

/**
 * @property opened boolean
 * @property withIcon boolean
 * @property iconCls string
 * @property placeHolder string
 */

class WpSearch extends React.Component {

    constructor(props) {
        super(props);

        var opened = false;
        if(typeof(this.props.opened) != 'undefined') {
            opened = this.props.opened;
        }

        this.state= {
            text: "",
            opened: opened,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleIconClick = this.handleIconClick.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeydown);
    }

    handleInputChange(event){
        const target = event.target;
        this.setState({
          text: target.value
        })
    }

    handleKeydown(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            this.search();
        }
    }

    handleIconClick(){
        if(this.state.opened) {
            if(this.state.text != "") {
                this.search();
            } else {
                this.setState({
                    opened: false
                })                
            }
        } else {
            this.setState({
                opened: true
            })
        }
    }

    search() {
        this.props.history.push('/s/'+this.state.text);
    }

    render() {

        var placeholder = 'Ingrese texto';
        if(typeof(this.props.placeholder) !== 'undefined') {
            placeholder = this.props.placeholder;
        }

        var withIcon = true;
        var iconCls = 'fas fa-search';
        if(typeof(this.props.withIcon) != 'undefined') {
            withIcon = this.props.withIcon;
            if(typeof(this.props.iconCls) != 'undefined') {
                iconCls = this.props.iconCls;
            }
        }

        var containerStateCls = 'closed';
        if(this.state.opened) {
            containerStateCls = 'opened';
        }

        var containerCls = 'lnk-wp-search ' + containerStateCls;

        return(
            <div className={containerCls}>
                { withIcon &&
                    <div>
                    { (this.state.opened && this.state.text != '') ?
                        <i className={iconCls} onClick={this.search}/>
                        :
                        <i className={iconCls} onClick={this.handleIconClick}/>
                    }
                    </div>
                }
                <input value={this.state.text} onChange={this.handleInputChange} placeholder={placeholder}/>
            </div>
        );
    }
}

export default withRouter(WpSearch);
