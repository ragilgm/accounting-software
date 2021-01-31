const initialState = {
    userid: "",
    user: "",
    companies: "",
    companyId: "",
    statementImportAccount: "",
    dataJournalEntryImport:"",
}



const dataReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "USER":
            state.userid = action.userid
            state.user = action.user
            return {
                userid: state.userid,
                user: state.user
            }
        case "COMPANYID":
            state.companyId = action.payload
            return {
                companyId:state.companyId
            }
        case "IMPORTACCOUNT":
            state.statementImportAccount = action.payload
            return {
                statementImportAccount:state.statementImportAccount
            }
        case "IMPORTJOURNALENTRY":
            state.dataJournalEntryImport = action.payload
            return {
                dataJournalEntryImport:state.dataJournalEntryImport
            }
        default:
            return state
    }
}

export default dataReducer