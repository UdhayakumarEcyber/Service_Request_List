import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { TitleBar, FilterPanel, ToggleFilter, WidgetWrapper, DataGrid, DataList, ItemCard, DataTable} from "uxp/components";
import './styles.scss';

 


interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

const Service_Request_ListWidget: React.FunctionComponent<IWidgetProps> = (props) => {


    let [toggleFilterValue, setToggleFilterValue] = React.useState<string>("month");

    const DATA = [
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/moniter.png",
            request: "Water Leak in ",
            user: "Johnson & Johnson request #81",
            section: "Zone 3",
            status: "pending",  
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/moniter.png",
            request: "Water Leak in ",
            user: "Johnson & Johnson request #81",
            section: "Parking 1",
            status: "pending",   
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Parking Damge",
            user: "Johnson & Johnson request #80",
            section: "Facility one",
            status: "approved",  
            date: "23/0702020",
            stip : "A1"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Lights not working at",
            user: "Johnson & Johnson request #80",
            section: "Zone 3",
            status: "approved", 
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "AC not working at",
            user: "Johnson & Johnson request #80",
            section: "Facility 12",
            status: "overdue",  
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Smoke in AC vents",
            user: "Johnson & Johnson request #80",
            section: "Facility 20",
            status: "assigned",  
            date: "23/0702020"
        },
        
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Water Leak in ",
            user: "Johnson & Johnson request #80",
            section: "Zone 3",
            status: "overdue", 
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Parking Damge",
            user: "Johnson & Johnson request #80",
            section: "Facility one",
            status: "approved",  
            date: "23/0702020",
            stip : "A2"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Lights not working at",
            user: "Johnson & Johnson request #80",
            section: "Zone 3",
            status: "approved", 
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "AC not working at",
            user: "Johnson & Johnson request #80",
            section: "Facility 12",
            status: "overdue",  
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Lights not working at",
            user: "Johnson & Johnson request #80",
            section: "Zone 3",
            status: "approved", 
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "AC not working at",
            user: "Johnson & Johnson request #80",
            section: "Facility 12",
            status: "overdue",  
            date: "23/0702020"
        },
        { 
            icon : "https://static.iviva.com/images/uxp-generic-widgets/chart-black-icon.png",
            request: "Smoke in AC vents",
            user: "Johnson & Johnson request #80",
            section: "Facility 20",
            status: "assigned",  
            date: "23/0702020"
        },
        
    ];
 
    const getDataItems = (max: number, pageToken: string) => {
        let last = 0

        if (pageToken !== null) last = parseInt(pageToken);

        let p = new Promise<{ items: Array<any>, pageToken: string }>((resolve, reject) => {
            let data = DATA.filter((item: any, key: number) => (key > last && key <= last + max));
            let response = { items: data, pageToken: (last + data.length).toString() }
            resolve(response);
        })

        return p;
    }
    

       // datalist
       const renderItem = (item: any, key: number) => {
        return (<div className="list-item"> 
            <div className="icon"><img src={item.icon}></img></div>
            <div className="work-request">
                <div className="user">{item.user}</div>
                <div className="req"><p>{item.request}</p> <div className="section">{item.section}</div><span className="stip">{item.stip}</span></div>  
            </div> 

            <div className="work-status">
                <div className={`status ${item.status}`} >{item.status}</div>
                <div className="date">{item.date}</div>
            </div> 
            
            
            
        </div>)
    } 
    
    return (
        <WidgetWrapper className="service_list_widget">
            <TitleBar title='Service_Request_List'>


                <div className="rht-title-section"> 
                                
                        <ToggleFilter
                            options={[
                                { label: "High Priority", value: "month" },
                                { label: "Low Priority", value: "week" } 
                            ]}
                            value={toggleFilterValue}
                            onChange={(value) => { setToggleFilterValue(value) }}
                        />

                        <FilterPanel> 
                        </FilterPanel>  

                </div>

            </TitleBar>


            <div className="service-request-widget">   

            {/* <div className="service-request-header"> 
                <div className="data-list-item">
                    <div className="list-item">
                        <div className="req">AC Extension request #80</div>
                        <div className="user">Jhonson &amp; Johnson request #81</div>
                        <div className="section">Parking 1</div>
                        <div className="status">approved</div>
                        <div className="date">23/0702020</div>
                    </div>
                </div>
            </div> */}

         <div className="service-request-body"> 

                <DataList
                    data={(max, last) => getDataItems(max, last)}
                    renderItem={renderItem}
                    pageSize={10}
                />
         </div>

                            
            

 </div> 

        </WidgetWrapper>
    )
};

/**
 * Register as a Widget
 */
registerWidget({
    id: "Service_Request_List",
    widget: Service_Request_ListWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});


function item(item: any, key: any) {
    throw new Error("Function not implemented.");
}
/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "Service_Request_List",
    label: "Service_Request_List",
    // click: () => alert("Hello"),
    component: Service_Request_ListWidget
});
*/

/**
 * Register as a UI
 */

 /*
registerUI({
    id:"Service_Request_List",
    component: Service_Request_ListWidget
});
*/