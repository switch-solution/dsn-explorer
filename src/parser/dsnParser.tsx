import { extractionsList } from "@/src/extraction/extraction"
import { EstablishmentObject, EmployeeObject, WorkContractObject, PayroolObject } from "@/src/type/type"
export class DsnParser {
    dsnRows: { id: string, value: string }[] = []
    constructor(dsnRows: { id: string, value: string }[]) {
        this.dsnRows = dsnRows
    }
    private filterByStructureDsn(collection: string) {
        const structureDsn = this.structureDsnListFilter(collection)
        const values = this.dsnRows.filter(dsnRow => structureDsn.includes(dsnRow.id))
        const labelFilter = values.map(dsnRow => dsnRow.id)
        const label = this.dsnObject(labelFilter)
        const datas = values.map(dsnRow => {
            let name = label.find(label => label.dsnStructure === dsnRow.id)
            return {
                id: dsnRow.id,
                value: dsnRow.value,
                label: name?.name ? name?.name : '',
                field: name?.field ? name?.field : ''
            }
        })
        return datas
    }

    private structureDsnListFilter(collection: string) {
        const structureDsn = extractionsList.filter(extraction => extraction.collection === collection)
        const dsnId = structureDsn.map(extraction => extraction.dsnStructure)

        return dsnId
    }

    private dsnObject(dsnStructure: string[]) {

        const structureDsnLabel = extractionsList.filter(extraction => dsnStructure.includes(extraction.dsnStructure))
        const dsnId = structureDsnLabel.map(extraction => {
            return {
                ...extraction
            }
        })
        return dsnId
    }

    private makeDynamicObject<T>(datas: { field: string, value: string }[]): T {
        let dynamicObject: any = {}
        for (let data of datas) {
            dynamicObject[data.field] = data.value
        }

        return dynamicObject
    }

    get establishment() {
        const datas = this.filterByStructureDsn('Establishment')
        const establishment = this.makeDynamicObject<EstablishmentObject>(datas)

        return establishment
    }

    get employees(): EmployeeObject[] {
        const datas = this.filterByStructureDsn('Employee')
        //Employee start S21.G00.30.001
        //Employee end 'S21.G00.30.018
        const employees = []
        let numSS = ''
        const numSSList = []
        const employeesRows = []
        for (const data of datas) {
            if (data.id === 'S21.G00.30.001') {
                //New employee
                numSS = data.value
                numSSList.push(numSS)
            }
            employeesRows.push({
                numSS,
                ...data
            })
            if (data.id === 'S21.G00.30.018') {
                //End employee
                numSS = ''
            }

        }
        for (const numSS of numSSList) {
            const employee = employeesRows.filter(dsnRow => dsnRow.numSS === numSS)
            employees.push(this.makeDynamicObject<EmployeeObject>(employee))
        }
        return employees
    }


    get workContracts(): WorkContractObject[] {
        const datas = this.filterByStructureDsn('WorkContract')
        //Employee start S21.G00.30.001
        //Employee end 'S21.G00.30.018
        const workContracts = []
        let numSS = ''
        const numSSList = []
        const workContractRows = []
        for (const data of datas) {
            if (data.id === 'S21.G00.30.001') {
                //New employee
                numSS = data.value
                numSSList.push(numSS)
            }
            workContractRows.push({
                numSS,
                ...data
            })
            if (data.id === 'S21.G00.30.018') {
                //End employee
                numSS = ''
            }

        }
        for (const numSS of numSSList) {
            const employee = workContractRows.filter(dsnRow => dsnRow.numSS === numSS)
            workContracts.push(this.makeDynamicObject<WorkContractObject>(employee))
        }
        return workContracts
    }


    get payrool(): PayroolObject[] {
        const datas = this.filterByStructureDsn('Payrool')
        //Employee start S21.G00.30.001
        //Employee end 'S21.G00.30.018
        const payrools = []
        let numSS = ''
        const numSSList = []
        const payroolsRows = []
        for (const data of datas) {
            if (data.id === 'S21.G00.30.001') {
                //New employee
                numSS = data.value
                numSSList.push(numSS)
            }
            payroolsRows.push({
                numSS,
                ...data
            })
            if (data.id === 'S21.G00.30.018') {
                //End employee
                numSS = ''
            }

        }
        for (const numSS of numSSList) {
            const employee = payroolsRows.filter(dsnRow => dsnRow.numSS === numSS)
            payrools.push(this.makeDynamicObject<PayroolObject>(employee))
        }
        return payrools
    }





}