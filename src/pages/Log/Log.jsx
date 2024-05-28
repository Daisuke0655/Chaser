import './Log.css';
import { format } from 'date-fns';

const Log = () => {
    const tmpData = [
        { id: 1, timestamp: "2023-05-21T12:34:56Z" },
        { id: 2, timestamp: "2023-05-21T14:20:00Z" },
        { id: 3, timestamp: "2023-05-21T15:45:30Z" }
    ]

    const handleItemClick = (item) => {
        alert(`Clicked on item with ID: ${item.id}`);
    };
    const formatTimestamp = (timestamp) => {
        return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
    };

    const DataList = ({ items }) => {
        const handleItemClick = (item) => {
            alert(`Clicked on item with ID: ${item.id}`);
          };
        return (
            <ul>
                {
                    tmpData.map(item=>(
                        <li key={tmpData.id} onClick={()=>handleItemClick(item)}>
                            {formatTimestamp(item.timestamp)}
                        </li>
                    ))
                }
            </ul>
        );
    };
    return (
        <div >
            <h1>過去のログ</h1>
            <DataList items={tmpData} />
        </div>
    );
}

export default Log
