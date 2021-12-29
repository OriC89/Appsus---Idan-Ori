
import {EmailList} from "../js/apps/mail/cmps/EmailList.jsx"
import {EmailNav} from "../js/apps/mail/cmps/EmailNav.jsx"

export function EmailApp(){

    return (
        <section className="mail-app">
          <EmailNav/>
          <EmailList/>
        </section>
    );
}
