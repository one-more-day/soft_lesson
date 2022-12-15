export interface ProjectType {
  sciNo: number;
  projectname: string;
  intro?: string;
  deadline: string;
  process?: number;
  attach?: string;
}
export interface ApplyProjectType {
  id: number;
  sciNo: number;
  applyId: number;
  tno: number;
  applyTime: string;
  checkStat: number;
  sciInfo: ProjectType;
  intro: string;
  attach: string;
}
export interface TeacAward {
  teacPatents: TeacPatent[];
  teacSofts: TeacSoft[];
  teacPapers: TeacPaper[];
}
export interface TeacPatent {
  patId: number;
  tno: number;
  address: string;
  postcode: string;
  idNumber: string;
  allPeople: string;
  attached: string;
  name: string;
  checkStat: number;
}
export interface TeacSoft {
  patId: number;
  tno: number;
  idNumber: string;
  softApply: string;
  softMaterial: string;
  idAuth: string;
  name: string;
  checkStat: number;
}
export interface TeacPaper {
  patId: number;
  tno: number;
  subject: string;
  thesis: string;
  name: string;
  checkStat: number;
}
