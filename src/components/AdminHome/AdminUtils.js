
export function setStateToEntryByLcfIdInUrl(component) {
    const url_array = document.location.href.split("/"); //get the url
    const id = url_array[url_array.length - 1]; //gets the id from the url

    const item = component.props.entries.find(i => i.lcf_id === Number(id));
    if (!item) {
        console.log("Failed to find entry by lcf_id in last segment of URL.", id);
        return null;
    } else {
        component.setState({
            lcf_id: item.lcf_id,
            gpa: item.gpa,
            clean_attend: item.clean_attend,
            pass_class: item.pass_class,
            detent_hours: item.detent_hours,
            act_or_job: item.act_or_job,
            passed_ua: item.passed_ua,
            current_service_hours: item.current_service_hours,
            hw_rm_attended: item.hw_rm_attended,
            comments: item.comments,

            // These are used on some UI screens but
            // are not stored in the database.
            absent: item.absent,
            tardy: item.tardy,
            late: item.late
        });
    }
    return item;
}
