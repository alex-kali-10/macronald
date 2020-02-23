function viewItem(e,item) {
    class AboutItem extends React.Component {
        constructor(props) {
            super(props);
            this.state = {item: item};
            window.react_food_menu = this;
        }

        delete(e){
            function unmount() {
                ReactDOM.unmountComponentAtNode(document.getElementById('areaForReactItem'))
            }
            $('.areaForReactItem ').removeClass('left-block');
            setTimeout(()=> unmount,500);
        }

        change_p1(e){
            $('.more-information').removeClass('view-p2');
            $('.more-information').removeClass('view-p3');
        }

        change_p2(e){
            $('.more-information').removeClass('view-p3');
            $('.more-information').addClass('view-p2');
        }

        change_p3(e){
            $('.more-information').removeClass('view-p2');
            $('.more-information').addClass('view-p3');
        }

        render() {
            let item = this.state.item;

            let listItem = item.listComponent.map((item)=>
                <div className="block-item">
                    {item}
                </div>
            );

            return (
                <div>
                    <div className='deleteReact' onClick={(e) => this.delete(e)}></div>
                    <div className='aboutItem'>
                        <div className='block-avatar' style={{ backgroundImage : 'url('+item.avatarUrl+')' }}></div>
                        <div className='block-name'> {item.name} </div>
                        <div className='block-price'>{item.price} Р.</div>
                        <div className='more-information'>
                            <div className='menu'><div className='p1' onClick={(e) => this.change_p1(e)}>О продукте</div><div className='p2' onClick={(e) => this.change_p2(e)}>Состав</div><div className='p3' onClick={(e) => this.change_p3(e)}>Пищевая ценность</div></div>
                            <div className='block'>
                                <div className='about'>{item.about_item}</div>
                                <div className='components'>{listItem}</div>
                                <div className='more'>
                                    <div>Ккал: {item.kkal} г.</div>
                                    <div>Жиры: {item.fats} г.</div>
                                    <div>Белки: {item.proteins} г.</div>
                                    <div>Углеводы: {item.carbohydrates} г.</div>
                                </div>
                            </div>
                        </div>
                        <div className='delete-item' onClick={(e) => this.delete(e)} ></div>
                    </div>
                </div>
            );
        }
    }

    $('.areaForReactItem').addClass('left-block');
    ReactDOM.render(
        <AboutItem />,
        document.getElementById('areaForReactItem')
    );
}