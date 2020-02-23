function giveListItem(obj,data){
    $.ajax({
        url: "/food_menu/api/listItem",
        method: "POST",
        headers: {'X-CSRFToken': csrf},
        data: data,
        dataType: 'text',
    }).done(function(response) {
        console.log(JSON.parse(response).newData);
        obj.setState({itemList: JSON.parse(response).newData});
    }).fail(function (error) {
        console.log(error);
    });
}


class Food_menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {page: 1, itemList: '',val1:''};
        window.react_food_menu = this;
    }
    componentDidMount(){
        $('.foodMenuSlider').slick({
            arrows: false,
            dots: true,
        });
        $(".foodMenuSlider button").empty();

        let item = this;
        $('.foodMenuSlider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            if(currentSlide!==nextSlide) {
                $('.slick-dots').addClass('display');
                setTimeout(()=> $('.slick-dots').removeClass('display'),1100);
                if(currentSlide > nextSlide){
                    $('.foodList').addClass('food-right');
                    $('.foodList2').addClass('food-center');
                    $('.foodList2').addClass('food-right2');
                    $('.foodList>div').clone().appendTo('.foodList2');
                    setTimeout(()=> $('.foodList').removeClass('food-right'),3);
                    setTimeout(()=> $('.foodList2').removeClass('food-center'),5);
                    setTimeout(()=> $('.foodList2').empty(),1200);
                }else{
                    $('.foodList').addClass('food-left');
                    $('.foodList2').addClass('food-center');
                    $('.foodList2').removeClass('food-right2');
                    $('.foodList>div').clone().appendTo('.foodList2');
                    setTimeout(()=> $('.foodList').removeClass('food-left'),3);
                    setTimeout(()=> $('.foodList2').removeClass('food-center'),5);
                    setTimeout(()=> $('.foodList2').empty(),1200);
                }
                item.setState({itemList: '', page: nextSlide + 1});
                $('.foodKorzSlider').slick('slickGoTo', nextSlide);
                $("body").removeClass('colorStyle' + (currentSlide + 1));
                $("body").addClass('colorStyle' + (nextSlide + 1));
            }
        });

    }

    addKorz(e,item){
        if(item.id in react_korz.state.korz){
            react_korz.delete('',item.id)
        }else{
            item['count'] = 1;
            korz[item.id] = item;
            react_korz.setState({korz: korz});
            $('#item' + item.id + ' .addKorz').addClass('delete');
        }
    }

    render() {
        let item = this.state;
        let listItem;
        if(this.state.itemList !== ''){
            listItem = Object.values(this.state.itemList).map((item)=>
                <div key={item.id} id = {'item'+item.id} className="block-item">
                    <div className='avatar-item' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                    <div className='name-item'>{item.name}</div>
                    <div className='price-item'>{item.price} P.</div>
                    <div className='areaClick' onClick={(e) => viewItem(e,item)} ></div>
                    {(item.id in react_korz.state.korz)?(
                        <button className='addKorz delete' onClick={(e) => this.addKorz(e,item)}></button>
                    ):(
                        <button className='addKorz' onClick={(e) => this.addKorz(e,item)}></button>
                    )}
                </div>
            );}else{
            giveListItem(this,{page: this.state.page});
        }
        this.state.val1 = listItem;
        return (
            <div className='foodMenu'>
                <div className="foodMenuSlider">
                    <div className='slide slide1'></div>
                    <div className='slide slide2'></div>
                    <div className='slide slide3'></div>
                    <div className='slide slide4'></div>
                    <div className='slide slide5'></div>
                </div>

                <div className='foodList2'></div>

                <div className='foodList'>
                    {(item.itemList === '') ?(
                        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div> </div>
                    ):(
                        <div>{listItem}</div>
                    )}
                </div>
            </div>
        );
        }
    }
