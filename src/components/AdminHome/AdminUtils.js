
export function setStateToEntryByLcfIdInUrl(component) {
    const url_array = document.location.href.split("/"); //get the url
    const id = url_array[url_array.length - 1]; //gets the id from the url

    const item = component.props.entries.find(i => i.lcf_id === Number(id));
    if (!item) {
        console.log("FAIL", id);
        console.log(id);
    } else {
        component.setState({
            lcf_id: item.lcf_id,
            pass_class: item.pass_class,
            gpa: item.gpa,
            absent: item.absent,
            tardy: item.tardy,
            late: item.late,
            clean_attend: item.clean_attend,
            detent_hours: item.detent_hours,
            act_or_job: item.act_or_job,
            passed_ua: item.passed_ua,
            current_service_hours: item.current_service_hours,
            hw_rm_attended: item.hw_rm_attended,
            comments: item.comments,
        });
    }
}
