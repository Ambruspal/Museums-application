enum VisitorCategory {
    standard = 'STANDARD',
    student = 'STUDENT',
    retired = 'RETIRED',
    museologist = 'MUSEOLOGIST'
}

export type Registration = {
    id?: number,
    personName: string,
    visitorCategory: VisitorCategory,
    visitTime: string,
    price: number
};