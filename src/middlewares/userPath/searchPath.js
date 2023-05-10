import { newSearch } from "../../redux/searchSlice";
import store from "../../redux/store";

export default function PersistRefresh({children}) {
    const item = JSON.parse(localStorage.getItem('search'))
    item.dates[0].startDate=new Date(item.dates[0].startDate)
    item.dates[0].endDate=new Date(item.dates[0].endDate)
        store.dispatch(newSearch({ 
            destination:item.city, 
            dates:item.dates, 
            options:item.options 
        }));
    return children
}

