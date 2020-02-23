function givePage(obj,data){
    $.ajax({
        url: "/food_menu/",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: 'text',
    }).done(function(response) {
        console.log(response);
        obj.setState({content: response });
    }).fail(function (error) {
        console.log(error);
    });
}



class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, content: ''};
        window.react_content = this;
    }

    toPage1(){
        react_content.setState({page: 1,content: ''});
        $('body').removeClass('view-ch2');
        $('body').removeClass('view-ch3');
        $('body').removeClass('view-ch4');
        $('body').removeClass('colorStyle2 colorStyle3 colorStyle4 colorStyle5');
        $('body').addClass('colorStyle1');
    }
    toPage2(){
        react_content.setState({page: 2,content: ''});
        $('body').addClass('view-ch2');
        $('body').removeClass('view-ch3');
        $('body').removeClass('view-ch4');
    }
    toPage3(){
        react_content.setState({page: 3,content: ''});
        $('body').addClass('view-ch3');
        $('body').removeClass('view-ch2');
        $('body').removeClass('view-ch4');
    }
    toPage4(){
        react_content.setState({page: 4,content: ''});
        $('body').addClass('view-ch4');
        $('body').removeClass('view-ch3');
        $('body').removeClass('view-ch2');
    }

    render() {
        let item = this.state;
        if(item.page === 1){
            return (
                <div>
                    <div className='mobile-menu'>
                        <div className='mainMenu'>
                            <div className='name'>McRonald</div>
                            <div className='item' onClick={this.toPage1}>Меню</div>
                            <div className='item' onClick={this.toPage2}>О нас</div>
                            <div className='item' onClick={this.toPage3}>Акции</div>
                            <div className='item' onClick={this.toPage4}>Качество</div>
                        </div>
                        <div className='item' onClick={(e) => $('.content').removeClass('mobile-view-korz')}>Меню</div>
                        <div className='item' onClick={(e) => $('.content').addClass('mobile-view-korz')}>Корзина</div>
                    </div>
                    <Food_menu/>
                    <View_korz/>
                </div>
            );
        }else{
            if(item.content === '') {
                givePage(this,{page:item.page});
                return (
                    <div>
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div> </div>
                        <div className='mobile-menu'>
                            <div className='mainMenu'>
                                <div className='name'>McRonald</div>
                                <div className='item' onClick={this.toPage1}>Меню</div>
                                <div className='item' onClick={this.toPage2}>О нас</div>
                                <div className='item' onClick={this.toPage3}>Акции</div>
                                <div className='item' onClick={this.toPage4}>Качество</div>
                            </div>
                        </div>
                    </div>
                );
            }else{
                return (
                    <div>
                        <div className='mobile-menu'>
                            <div className='mainMenu'>
                                <div className='name'>McRonald</div>
                                <div className='item' onClick={this.toPage1}>Меню</div>
                                <div className='item' onClick={this.toPage2}>О нас</div>
                                <div className='item' onClick={this.toPage3}>Акции</div>
                                <div className='item' onClick={this.toPage4}>Качество</div>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML= {{__html: item.content}} >

                        </div>
                    </div>
                );
            }
        }
    }
}

ReactDOM.render(
    <Content />,
    document.getElementById('content')
);