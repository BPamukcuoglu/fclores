import type { Report } from '../types/report';
import axios from 'axios';

class ReportApi {
  // eslint-disable-next-line arrow-body-style
  getReports = async (): Promise<Report[]> => {
    return axios.get('http://localhost:3000/reports/all')
      .then((resp) => (
        resp.data.map((data) => ({
          id: data.id,
          department: data.course.substring(0, 4),
          instructor: data.instructor,
          semester: data.semester,
          course: data.course.substring(4,),
          status: data.status,
          createdAt: new Date(),
          excelRaw: data.excelRaw,
          clo: data.cloEncoded,
          checksum: data.checksum,
          txnId: data.txID
        }))
      ))
      .catch((err) => {
        console.error(err)
      })
  }

  async getReport(id: number): Promise<Report> {
    const reports = await this.getReports();
    console.log("****", id)
    console.log(reports.find((a) => a.id === id))
    return reports.find((a) => a.id === id);
  }

  async getCollectives(): Promise<any> {
    return axios.get('http://localhost:3000/reports/collective-reports')
      .then((resp) => (
        resp.data
      ))
      .catch((err) => {
        console.error(err)
      })
  }

  async getLatexSingle(semesters, courses, type): Promise<any> {
    return axios.post('http://localhost:3000/reports/latex', { type, semesters, courses })
      .then((resp) => (resp.data))
      .catch((err) => { console.log(err) })
  }

  async getLatexCollective(semesters, type): Promise<any> {
    return axios.post('http://localhost:3000/reports/latex', { type, semesters })
      .then((resp) => (resp.data))
      .catch((err) => { console.log(err) })
  }
}

export const reportApi = new ReportApi();
