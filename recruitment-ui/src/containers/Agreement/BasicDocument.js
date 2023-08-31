import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from "@react-pdf/renderer";
import myIcon from '../Header/pearl-island-logo.jpg'

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 35,
  },
  // title: {
  //   fontSize: 24,
  //   textAlign: 'center',
  //   fontFamily: 'Oswald'
  // },
  header: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    fontSize: 16,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    textDecoration: 'underline',
    fontWeight: 'heavy'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    fontFamily: 'Oswald',
    textDecoration: 'underline',
  },
  text: {
    // margin: 12,
    marginLeft: 15,
    paddingLeft: 15,
    marginTop: 5,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 30,
    marginHorizontal: 100,
  },
  emphasis: {
    margin: 12,
    fontSize: 24,
    color: '#F22300',
    fontFamily: 'Oswald'
  },
  image: {
    width: "120px",
    height: "60px",
    marginTop: "25px",
    marginLeft: 20
  },
});


// Create Document Component
function BasicDocument(props) {
  const { Client, updatedAt, duration, payment_schedule ,referal_validity} = props.func
  const {name,title} = props.data
  const date = updatedAt.split('T')[0].split("-").reverse().join("-")
  console.log(date);

  return (
    <Document>
      <Page style={styles.body} wrap>
        <Image
          style={styles.image}
          src={myIcon}
        />
        <Text
          style={styles.header}>Terms of Engagement for "Exclusive Selection" and other
          services between  {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)}  and Pearl  Island Manpower
        </Text>
        <Text style={styles.subtitle}>
          1.Scope of Services
        </Text>
        <Text style={styles.text}>
          The scope of services under the engagement is:{"\n"}
          a. Sourcing/ Screening appropriate candidates for {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)} to choose from.{"\n"}
          b. Support decision making/ interaction to help choose candidates.{"\n"}
          c. Assistance in negotiation / finalization of compensation of the candidate.{"\n"}
        </Text>
        <Text style={styles.subtitle}>
          2.Duration
        </Text>
        <Text style={styles.text}>
          The terms of this Agreement shall be effective from {date} and shall
          continue to be valid unless terminated by either Party with a {duration} days’ prior written notice.
        </Text>
        <Text style={styles.subtitle}>
          3.Professional Fees
        </Text>
        <Text style={styles.text}>
          Professional fees will be as under{"\n"}
          {"\n"}
          a.50% of monthly basic salary up to the level of supervisors{"\n"}
          b.50% of monthly gross salary for positions above supervisors{"\n"}
          {"\n"}
          *Gross salary - Monthly cost to company is defined as total expected
          income during the first month of employment, includes fixed salary (basic + allowances) .{"\n"}
          ii. Any other levies / taxes as applicable will be extra to {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)} account.
        </Text>
        <Text style={styles.subtitle}>
          4.Preapproved Out of Pocket expenses
        </Text>
        <Text style={styles.text}>
          Any out of pocket expenses e.g. consultant’s travel & stay for interview; reimbursement of
          travel expenses of candidates to attend interview; interview venue expenses
          etc — as pre approved — to be reimbursed at actual — within 7 days of submission of relevant supporting documents.
        </Text>
        <Text style={styles.subtitle} >
          5.Payment Schedule
        </Text>
        <Text style={styles.text} >
          On Joining of Candidate: Full amount to be paid within {payment_schedule} days from the date of joining of the Candidate.
        </Text>
        <Image
          style={styles.image}
          src={myIcon} break
        />
        <Text style={styles.subtitle} >
          6.Free Replacement Commitment
        </Text>
        <Text style={styles.text}  >
          PI indertakes that should the candidates recruited through PI leave {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)}  with three months (90 days) of joinind date
          PI will provide a replacement free of charge for pre-approved out of pocket expenses which will be reimbursed on an actual basic.
          {"\n"}{"\n"}
          This commitment applies to voluntary departure or the employee and unsatisfactory performance resulting in termination by {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)} . This commitment jhall not apply to workforce reduction or
          mass terminations by ORC or any any force majeure circumstances.
        </Text>
        <Text style={styles.subtitle} >
          7.Validity of referral
        </Text>
        <Text style={styles.text}>
          Will be one {referal_validity} year ({referal_validity*365} days) from date of referral i.e. unless {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)}  advises that the candidate had
          already been referred through alternate sources within three working days of referral in writing.
          The fees as per Clause 3. Professional Fees' Is payable in
          full if the candidate is made an offer within {referal_validity} ({referal_validity*365} days) from date of referral.
        </Text>
        <Text style={styles.subtitle}>
          8.Financial Responsbilty
        </Text>
        <Text style={styles.text}>
          Pl's financial responsibility under this agreement will be restricted to professional fees billed and received.
        </Text>
        <Text style={styles.subtitle}>
          9.Confidentiality
        </Text>
        <Text style={styles.text}>
          Pl expects {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)} to treat all information pertaining to the candidates
          and our terms etc. in strictest confidence and not to refer or divert it to any party,
          including but not limited to sister companies, friends, or associates without our prior written permission.
          {"\n"}{"\n"}
          We are sure you will find the above In order and confirm your
          concurrence by returning a signed letter for your reference and record.
        </Text>


        <View style={{ display: "flex", flexDirection: "row", marginBottom: 2, marginTop: 20 }}>
          <Text style={{ fontSize: 14, fontFamily: 'Oswald', flex: 1, marginLeft: 12 }}>For and behalf of</Text>
          <Text style={{ fontSize: 14, fontFamily: 'Oswald', flex: 1, marginLeft: 12 }}>For and behalf of</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginBottom: 70, marginTop: 2 }}>
          <Text style={{ fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman', marginLeft: 12 }}>
          {Client.name.charAt(0).toUpperCase() + Client.name.slice(1)}{"\n"}
            {Client.address}{"\n"}{"\n"}

            {Client.city}, {Client.country}{"\n"}
            Signature:{"\n"}
            Name-{Client.name.charAt(0).toUpperCase() + Client.name.slice(1)}{"\n"}
            Title-Chief Executive Officer{"\n"}
            Date:{date}{"\n"}
          </Text>

          <Text style={{ fontSize: 14, textAlign: 'justify', fontFamily: 'Times-Roman',marginLeft:65,paddingLeft:10}}>
            Pearl Island{"\n"}
            Office 39, Building 1999, Way 905{"\n"}{"\n"}
            Al Khuwair, Muscat, Oman{"\n"}
            Signature:{"\n"}
            Name- {name.charAt(0).toUpperCase() + name.slice(1)}{"\n"}
            Title-{title}{"\n"}
            Date:{date}{"\n"}
          </Text>
        </View>
      </Page>
    </Document>
  );






}

export default BasicDocument;

