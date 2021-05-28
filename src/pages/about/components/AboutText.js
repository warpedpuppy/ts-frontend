import './AboutText.css';
export default function AboutText(props) {
    return (
        <>
        <section id="about-text">
          <h3>about me</h3>
          <p>Hey.</p>
          <p>In 2004 I was the most miserable lawyer that existed on the planet, so I said "fuck it" and went and bought all the webdev software that existed at the time and enrolled in a trade school in San Francisco.</p>
          <p>And I've never regretted it for a minute.</p>
          <p>Now, <span id="years-working">{props.yearsWorking}</span> years later I have worked at big companies and small companies.  And perhaps most interestingly I worked with two companies that went from tiny to super successful while I was there (coincidence? most definitely).</p>
          <p>I'm currently winding down a little professionally and am mostly mentoring through a company and creating my own shit.  Both of which I love.</p>
          <p>But just for more details, here are some things about me:</p>
          <ul>
          <li>Graduated from U.C. Berkeley with Honors.</li>
          <li>Graduated from U.C. Hastings, College of the Law.  
          <ul>
          <li>Won grant to work with International Gay and Lesbian Human Rights Commission.</li>
          <li>Passed the California and Connecticut bar examinations.</li>
          </ul>
          </li>
          <li>Attended coding school at San Francisco&apos;s Academy X.</li>
          <li>Worked for an educational game company, programming games.</li>
          <li>Worked for an app development company and coded 6 mobile apps.</li>
          <li>Worked for The Dodo and coded the front end viewed by 17 million people per month.</li>
          <li>Managed a subscription based ecommerce site built in VueJS.</li>
          <li>Mentor at CareerFoundry.</li>
          </ul>
        </section>
        
        </>
    )
}
