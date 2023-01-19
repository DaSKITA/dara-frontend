
let automaEvent = '__automa-ext__';
export let recordWorkflowEvent = (url = "") => new CustomEvent(
    automaEvent, {
    'detail': {
        'type': 'record-workflow',
        'data': {
            "url": url
        },
    }
});

export let fetchWorkflowsEvent = (revalidate = false) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'worflow-fetchall',
        'data': { "revalidate": revalidate },
    }
});


export let executeWorkflowEvent = (controller: any) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'execute-workflow',
        'data': { "workflow": controller }
    }
});

export let deleteWorkflowEvent = (controllerId: any) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'workflow-delete',
        'data': { "workflowId": controllerId }
    }
});

export let editWorkflowEvent = (controllerId: any) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'open-workflow',
        'data': { "workflowId": controllerId }
    }
});

export let closeTabEvent = (currentWorkflowTabObj: any) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'remove-tab',
        'data': { "tabId": currentWorkflowTabObj['id'] }
    }
});

export let openTabEvent = (currentWorkflowTabIdObj: any) => new CustomEvent(automaEvent, {
    'detail': {
        'type': 'set-active-tab',
        'data': { "tabId": currentWorkflowTabIdObj['id'] }
    }
});
