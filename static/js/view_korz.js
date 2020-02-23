class View_korz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {korz:korz};
        window.react_korz = this;
        this.plus = this.plus.bind(this);
        this.minus = this.minus.bind(this);
    }

    componentDidMount() {
        $('.foodKorzSlider').slick({
            arrows: false,
            dots: false,
        });
    }

    componentWillUnmount(){
        korz = this.state.korz;
    }

    plus(e,id){
        let item = this.state.korz;
        item[id].count += 1;
        this.setState({korz: item});
    }

    minus(e,id){
        let item = this.state.korz;
        item[id].count -= 1;
        if(item[id].count === 0){
            delete item[id];
            $('#item' + id + ' .addKorz').removeClass('delete');
        }
        this.setState({korz: item});
    }

    delete(e,id){
        let item = this.state.korz;
        delete item[id];
        this.setState({korz: item});
        $('#item' + id + ' .addKorz').removeClass('delete');
    }

    allPrice(){
        let item;
        let price = 0;
        for(item in this.state.korz){
            price+= this.state.korz[item].price * this.state.korz[item].count;
        }
        return price
    }

    allFats(){
        let item;
        let price = 0;
        for(item in this.state.korz){
            price+= this.state.korz[item].fats * this.state.korz[item].count;
        }
        return price
    }

    allProteins(){
        let item;
        let price = 0;
        for(item in this.state.korz){
            price+= this.state.korz[item].proteins * this.state.korz[item].count;
        }
        return price
    }

    allCarbohydrates(){
        let item;
        let price = 0;
        for(item in this.state.korz){
            price+= this.state.korz[item].carbohydrates * this.state.korz[item].count;
        }
        return price
    }


    render(){
        let item = this.state;
        let listItem;
        if(Object.keys(item.korz).length !== 0){
            listItem = Object.values(item.korz).map((item)=>
                <div key={item.id} id = {'itemkorz'+item.id} className="block-item">
                    <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }} ></div>
                    <div className='name-item' >{item.name}</div>
                    <div className='price-item'>{item.price} P.</div>
                    <div className='areaClick' onClick={(e) => viewItem(e,item)} ></div>
                    <div className='count-item'><button className='minus-item'  onClick={(e) => this.minus(e,item.id)}></button>{item.count}<button className='plus-item' onClick={(e) => this.plus(e,item.id)}></button></div>
                    <button className='delete-item'  onClick={(e) => this.delete(e,item.id)}></button>
                </div>
            );}
        return (
            <div className='foodKorz'>
                <div className='listKorz'>
                    {listItem}
                </div>
                <div className="foodKorzSlider">
                    <div className='slide slide1'></div>
                    <div className='slide slide2'></div>
                    <div className='slide slide3'></div>
                    <div className='slide slide4'></div>
                    <div className='slide slide5'></div>
                </div>
                {(Object.keys(item.korz).length !== 0)?(
                <div>
                    <div className='allInformation'>
                        <div className='fats'>Жиры: {this.allFats()} г.</div>
                        <div className='proteins'>Белки: {this.allProteins ()} г.</div>
                        <div className='carbohydrates'>Углеводы: {this.allCarbohydrates()} г.</div>
                    </div>
                    <div className='buy'> <div className='allPrice'>{this.allPrice()} Р.</div></div>
                </div>
                ):(
                    <div></div>
                )}
            </div>
        );

    }
}