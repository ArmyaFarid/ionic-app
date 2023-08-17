import { ReactComponent as SearchIco } from '../../assets/icons/searchIco.svg';

function PayementBoardHead({parentWidth,showForm,setSearchString,searchString}) {
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchString(value);
    };
    return (
        <div className="component-header" style={{width:parentWidth}}>
            <div className="page-label">
                <h5>Details des paiements</h5>
            </div>
            <div className="search-box">
                <form>
                    <input type="text" placeholder="Filter by name" onChange={handleSearchChange} value={searchString}/>
                    <div className="search-icon">
                        <SearchIco/>
                    </div>
                    <button className="primary" type="button" hidden>Search</button>
                </form>
            </div>

        </div>
    );
}

export default PayementBoardHead;