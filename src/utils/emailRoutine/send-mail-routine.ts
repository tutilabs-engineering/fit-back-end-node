import schedule from 'node-schedule'
import { SendEmail } from '../email-fit-nodemailer/nodemailer'
import { FitMysqlRepository } from '../../infra/data-mysql/fit-mysql-repository'

const fitRepository = new FitMysqlRepository()
const sendEmail = new SendEmail()

export async function sendMailOnApprovalRoutine(){
    const rule = new schedule.RecurrenceRule();
    rule.hour = 7;
    rule.minute = 0;
    rule.tz = 'America/Manaus';

    schedule.scheduleJob(rule, async () =>{
        const FitsOnApproval = await fitRepository.listOnApproval()
        try {
            await sendEmail.sendEmailAllFitOnApprovalDepartments(FitsOnApproval)
        } catch (error) {
            console.log(error)
        }
    })
}