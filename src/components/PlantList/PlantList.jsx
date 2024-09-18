import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();
    const plants = useSelector(store => store.elements);
    const reduxState = useSelector(store => store);

    useEffect(() => {
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' })
    }, []);

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
