# 📝 Notes

Apr 23, 2026

## poc+

Invited [Jan van Kranendonk](mailto:jan@zeroemissionfuels.com) [Mrigank Sinha](mailto:m.sinha@zeroemissionfuels.com)

Attachments [poc+](https://calendar.google.com/calendar/event?eid=MmtzbnI4bmhyZjBpZnJnaGJ2bjF0bmNmOHAgamFuQHplcm9lbWlzc2lvbmZ1ZWxzLmNvbQ)

Meeting records [Transcript](https://docs.google.com/document/d/1DsfwnLBjfTpTcYOZXtcY5g3yA7VTZzvE-9_bagHUJlw/edit?usp=drive_web&tab=t.ie61alr10wx6) 

### Summary

Technical modeling session established iterative carbon capture formulas and defined multi-stage stripping concepts for improved performance.

**Iterative modeling framework established**  
The team confirmed an iterative approach to calculate carbon dioxide output concentration using mass balance and exponential decay profiles. They moved calculations into a dedicated spreadsheet to ensure convergence.

**Performance optimization strategy defined**  
Participants agreed to improve spacetime yield by integrating solvent leanness as a variable. They decided to prioritize updating the absorber model before exploring complex multi-stage stripping designs.

**Design approach for stripping**  
The discussion finalized a decision to implement a multi-stage stripping approach to achieve performance targets. A simplified prototype using a heated pipe will be used for testing.

### Next steps

- [ ] \[Mrigank Sinha\] Implement Model: Code converged column logic in Python; model spacetime yield as function of PPM; solve iteratively for CO2 ppm out.

- [ ] \[Mrigank Sinha\] Check CO2: Take laptop outside; sit in sun for 20 minutes to check ambient CO2 levels.

- [ ] \[Mrigank Sinha\] Update Absorber: Prioritize performing a good absorber model update.

- [ ] \[The group\] Redo Stripping Model: Rerun the multi-stage stripping model for box to determine potential factor savings.

- [ ] \[Jan van Kranendonk\] Present Mockup: Present the mini ISA/AC sketch mockup to Mrigank next week for refinement.

### Details

* **Iterative Calculation for CO2 Capture and Output Concentration**: Jan van Kranendonk explained that CO2 capture is based on mass flow and spacetime yield, which itself depends on the exit parts per million (PPM) concentration, creating an implicit formula that can be solved iteratively. Mrigank Sinha agreed that multiplying the mass flow with the spacetime yield, which is a function of the exit PPM, creates a strong, looped assumption. The iterative process involves assuming an outlet PPM, calculating an average PPM in the column, determining the capture rate, and then using mass balance to calculate a new outlet PPM, repeating until the result converges ([00:01:58](#00:01:58)).

* **Modeling the PPM Profile within the Column**: Jan van Kranendonk stated that if the spacing is proportional to the PPMs, the concentration profile over the column should follow a decay exponential towards zero, not a linear curve ([00:01:58](#00:01:58)). Mrigank Sinha confirmed that if they assume the concentration is proportional to PPMs, it should be logarithmic, or decay exponential. Jan van Kranendonk suggested that a starting point should come from measurement to assume a fitting point ([00:02:51](#00:02:51)).

* **Confirmation of the Iterative Model Approach**: Mrigank Sinha agreed that the proposed iterative model, which relies on the decay exponential profile assumption, seems workable. This model should allow them to calculate the CO2 behavior in a room given a certain airflow (cubic meter per hour) and geometry (length of wires) ([00:03:46](#00:03:46)). The final result will determine the size and performance of the machine ([00:04:35](#00:04:35)).

* **Impact of Solvent Leanness on Spacetime Yield**: Jan van Kranendonk introduced a third parameter for performance sizing: the leanness of the solvent, which should increase the spacetime yield. They noted that if they can increase the spacetime yield by running on a leaner solvent, the overall machine size could decrease ([00:04:35](#00:04:35)).

* **Analysis of Spacetime Yield Data Noise**: Mrigank Sinha presented data showing the spacetime yield dropping wildly across different percentages, which Jan van Kranendonk immediately recognized as noisy, suggesting it's a derivative of measured data ([00:05:27](#00:05:27)). Jan van Kranendonk suggested that a cleaner curve would require drawing an exponential fit through the measured data first. They agreed that the current model is robust enough and that humidity effects are too complicated to include at this stage ([00:06:17](#00:06:17)).

* **Establishing the Ambient CO2 Concentration**: Mrigank Sinha noted that the CO2 assumption is missing from the current discussion and that whether they take $660$ or $400$ PPM will significantly change the model output. Jan van Kranendonk suggested that if the sensor reads $600$ PPM outside, they should consider it equal to ambient concentration. Mrigank Sinha committed to checking the ambient CO2 concentration themself to verify the reading ([00:07:01](#00:07:01)).

* **Defining the Next Modeling Steps**: Mrigank Sinha summarized the next steps: modeling the spacetime yield as a function of PPM, solving iteratively for the CO2 output PPM, and establishing the relationship with the mass flow rate. Jan van Kranendonk documented the steps, agreeing to share their screen to ensure they were on the same page ([00:07:55](#00:07:55)).

* **Refining the Iterative Calculation Logic**: During the process of formalizing the steps, Mrigank Sinha identified that the calculation was breaking because the average logarithmic mean temperature difference (LMTD) PPM was being used to find the delta PPM, creating a circular reference ([00:10:17](#00:10:17)). The agreed-upon correction was that the average PPM must first flow through a spacetime yield (STY) calculation to obtain the moles per second of CO2 capture, which then determines the PPM out ([00:11:49](#00:11:49)).

* **Setting Up the Calculation Sheet**: The participants decided to move the calculation to a new Google Sheet named "DAC Soda Stream" within the Versuni directory for clarity and collaboration ([00:13:49](#00:13:49)). They established initial inputs, including $1,200$ PPM in and an assumed $400$ PPM out, and confirmed the formula for logarithmic average PPM ([00:14:40](#00:14:40)).

* **Testing the Iterative Convergence**: Testing the initial calculation in the sheet with assumed values for wire length and spacetime yield produced a very low capture rate ([00:17:00](#00:17:00)). After correcting a few formula errors, the calculation converged, demonstrating that the algorithm successfully determines the outlet PPM for a given input PPM and machine configuration ([00:20:25](#00:20:25)).

* **Sizing and Improving Core Spacetime Yield**: Jan van Kranendonk noted that the model serves as the basis for the algorithm, and the next challenge is to improve the core spacetime yield number through deeper stripping ([00:23:22](#00:23:22)). They suggested that the stripping leanness should be incorporated into the model by making the spacetime yield proportional to the lean percentage ([00:24:24](#00:24:24)) ([00:54:21](#00:54:21)).

* **Deep Stripping and Multistage Column Design**: The discussion shifted to how to strip deeper, suggesting high temperature and multiple stages. Mrigank Sinha proposed having more stages, potentially a packed column, to increase the effective number of stages ([00:25:11](#00:25:11)). Jan van Kranendonk emphasized that process technology has used stripping in stages for centuries, favoring a multi-stage approach for deeper stripping ([00:27:02](#00:27:02)).

* **Proposed Heat Pipe Stripper Concept**: Jan van Kranendonk proposed an inclined, coiled-up pipe design that functions like a heat pipe to maximize heat transfer and provide a long resonance time for effective stripping. The goal is to maximize the partial pressure of water and minimize the partial pressure of CO2 at the lowest point (lean), facilitating deep stripping ([00:29:24](#00:29:24)). Mrigank Sinha questioned the lack of a traditional pot at the bottom, arguing that a bulk fluid is necessary for high partial pressure of H2O and sufficient resonance time for mass transfer ([00:31:25](#00:31:25)) ([00:33:00](#00:33:00)).

* **Testing and Prototype for Deeper Stripping**: To test the concept, Jan van Kranendonk suggested a simplified, cheaper prototype: a long, straight, insulated pipe with a flow-controlled pump and a heater clamp. They agreed that this could be modified by adding fins or other internal features to improve efficiency. A siphon or "toilet exit" would be needed after the cooling block to prevent air from entering the system ([00:43:47](#00:43:47)).

* **Conclusion on Project Approach and Next Steps**: The discussion concluded that achieving a "pop plus" device requires pushing the limits of the mini design, specifically through multi-stage stripping and optimizing the fan air. The immediate plan is to first update the absorber model, which is simpler and quicker, to check feasibility. They agreed that a multi-stage stripping factor of $2\\text{x}$ improvement is feasible and could be demonstrated. Mrigank Sinha intends to present the current model agreement at the meeting the following week ([00:50:28](#00:50:28)) ([00:52:48](#00:52:48)).

* **Incorporating Stripping Leanness in the Model**: Jan van Kranendonk suggested incorporating the stripping lean percentage as a simple, non-data-driven slider in the model for internal assessment ([00:53:34](#00:53:34)). This will help them determine the required lean percentage to hit performance targets, which can then guide future experiments ([00:54:21](#00:54:21)).

* **Update on Other Project Activities**: Mrigank Sinha provided an update on other work, including preparing safety box materials for Paul and ordering necessary components ([00:55:07](#00:55:07)). Jan van Kranendonk mentioned they would be back on Monday (King's Day) and would prepare to run the air conditioning (AC) ([00:51:22](#00:51:22)). Jan van Kranendonk also mentioned having discussed a "mini ISA" sketch mockup with Leonard that they will refine with Mrigank Sinha next week .

*You should review Gemini's notes to make sure they're accurate. [Get tips and learn how Gemini takes notes](https://support.google.com/meet/answer/14754931)*

*How is the quality of **these specific notes?** [Take a short survey](https://google.qualtrics.com/jfe/form/SV_9vK3UZEaIQKKE7A?confid=r_mfr2f27_8Kk-Ot0oBGDxITOAIIigIgABgDCA&detailid=standard&screenshot=false) to let us know your feedback, including how helpful the notes were for your needs.*

# 📖 Transcript

Apr 23, 2026

## poc+ \- Transcript

### 00:00:00

   
**Jan van Kranendonk:** times the mass flow. If your mass flow is zero, you're going to you're going to capture zero CO2. Yeah. And so the moment you make your mass flow non zero, you will capture some CO2. You have a mass flow, you have a PTM in, you have a capture rate because your space time of the average space time, and you can feed that back into the model to actually calculate the outside PTM. So that's an that's an an an an an an an an um implicit formula but one you can solve quite easily in Python.  
**Mrigank Sinha:** Yeah, but then Yeah,  
**Jan van Kranendonk:** You know what I mean?  
**Mrigank Sinha:** but is it true then because because you are  
**Jan van Kranendonk:** I think it's at least  
**Mrigank Sinha:** multiplying the mass flate with the space-time yield and the spacetime yield itself is a  
**Jan van Kranendonk:** Yeah. Oh yeah. Yeah.  
**Mrigank Sinha:** function of the exit ppm. So then it becomes a loop and then it's an assumption and it is a strong assumption.  
   
 

### 00:00:51

   
**Mrigank Sinha:** Right? I get what you're trying to say but I'm just uh  
**Jan van Kranendonk:** No poke at it. I I'm just a webber mounting. But let's uh I'm going to go to quickly to Mito because this is how it works, right? We start something and then are you able to So your question is let's say I get you some numbers. Are you able to to uh verify whether it can be correct or  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** not? If you know what I mean.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** So, uh let's say I tell you, you tell me it's 2,000 ppm in. Yeah. Then,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** uh hang on. I'm nearly there. Password. Um this here let's say it's 2,000 ppm in just a thought uh calculation I am assuming oh and by the way it's 100 cubic meters per hour I'm assuming uh 500 ppm out just a random assumption that's my assumption start then I also assume a profile over  
   
 

### 00:01:58 {#00:01:58}

   
**Mrigank Sinha:** Sorry.  
**Jan van Kranendonk:** the column which knowing what spacetime yield is proportional to the ppms got to be a decay exponential towards zero. Yeah, because that's how it works.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** If you if your spacing is proportional to the ppms, it got to go like this, right? It's not going to be linear. It's going to be. So that means I will calculate based on the assumption of the out ppm and average ppm in the column.  
**Mrigank Sinha:** No.  
**Jan van Kranendonk:** Okay, I got an average ppm. I got average. I got an in ppm, average ppm. I got from the average ppm, I got the space time, I got capture rate. If I got capture rate times my 100 meter cube per hour,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** I got total CO2 removed per hour. Yeah, my my space back.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Now I also back plug that in. If I know how much I'm capturing per hour and I know my CO2 in my mass balance will tell me the output.  
   
 

### 00:02:51 {#00:02:51}

   
**Jan van Kranendonk:** So that's a new assumption. So we do the M again until it converges and then you have a certain outlet a certain profile an  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** average space time over the column and and and the mass and the the cub is a slider. I think that's a quite simple one to solve. It's a very simple formula.  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** I don't think we can do a simpler model without a lot of measurement and data acquisition.  
**Mrigank Sinha:** Now the only then assumption is with the profile that you take inside the column whether it's a straight line or a  
**Jan van Kranendonk:** We can calculate that.  
**Mrigank Sinha:** logarithmic or whatever.  
**Jan van Kranendonk:** If we assume it's proportional to ppms,  
**Mrigank Sinha:** Yeah, then it's logarithmic.  
**Jan van Kranendonk:** then it must be decay exponential and and and in what shape well it goes  
**Mrigank Sinha:** Let's send an extra mention to  
**Jan van Kranendonk:** it goes towards zero, right?  
**Mrigank Sinha:** get  
**Jan van Kranendonk:** Because at zero you have zero capture and at 1200 ppm you have the 1200 ppm over 400 times of minus 7\. You need to have some sort of a point where you say this is coming from measurement and then we assume a hitting  
   
 

### 00:03:46 {#00:03:46}

   
**Mrigank Sinha:** okay. I'm going to try that. I think that will work probably. And then you have uh that and that might be a fair assumption as well with uh Yeah,  
**Jan van Kranendonk:** I think that could be a fair assumption.  
**Mrigank Sinha:** that could be a fair  
**Jan van Kranendonk:** Then the question next is because you were already ahead of the thing but the question next is so now we should be able to given a certain cubic meter per hour we should be able to calculate what the CO2 does in the room and given a geometry and amount of wires etc. So I you know I slide 60 mters of wire I slide a certain you know baseline  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** space time yield or we get it from data it's hardcoded I slide a certain cubic per hour and I size and  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** then I will tell you like ah this profile looks good how the CO2 imbalances with one or two or three people in the room your model is really nice for that and uh it will probably end up with like okay then the machine  
   
 

### 00:04:35 {#00:04:35}

   
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** is going to be this big and this is going to be the performance and we can show it to people that is the sizing  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** of the in liberal terms of size and then after that we have the challenge of improving the core spaceime yield number by uh running on a leaner solar  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** because there's a third parameter it's not only cubic meters it's not BPM is also the leaniness of the soy which will increase the space. Now if we step deeper we can get space up and the whole machine goes down and so that should be the third one in the model and I'm not sure how it correlates to space. Do you have any data on that? Like is it literally well you have the graph  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** right?  
**Mrigank Sinha:** It's it's it's completely crazy because look at this. If you look here uh sorry 9 point some 9% 1 e minus  
**Jan van Kranendonk:** Yeah. Yeah.  
   
 

### 00:05:27 {#00:05:27}

   
**Mrigank Sinha:** 6 11% 4 12 2 it's dropping  
**Jan van Kranendonk:** It's noisy. It's noisy,  
**Mrigank Sinha:** crazy if you if you look at this line and  
**Jan van Kranendonk:** but I think your curfeit is pretty decent.  
**Mrigank Sinha:** if this is 1 e minus 6 at 8ish you will always get 1 e minus 6 if you go to four then you get 60% higher so that's a lot to gain just by doing  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** the wheeling  
**Jan van Kranendonk:** Can you show me the base curve? Because this is of course a derivative. Derivatives always become very noisy if you do it on measured data. You measure the actual FDI data,  
**Mrigank Sinha:** No.  
**Jan van Kranendonk:** right? The the the CO2 percentage.  
**Mrigank Sinha:** Yeah, this is it. So,  
**Jan van Kranendonk:** Can you can you show it over time or no?  
**Mrigank Sinha:** here.  
**Jan van Kranendonk:** Percentage CO2 versus uh Yeah. versus time to be honest  
**Mrigank Sinha:** So,  
**Jan van Kranendonk:** just  
**Mrigank Sinha:** just just let's load this one here.  
   
 

### 00:06:17 {#00:06:17}

   
**Jan van Kranendonk:** Yeah. Yeah. So to get a cleaner curve you need to draw first a line an exponential fit through this  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** and then the  
**Mrigank Sinha:** And then get that. Yeah.  
**Jan van Kranendonk:** numbers but I trust your  
**Mrigank Sinha:** Or do a lot of moving average. I  
**Jan van Kranendonk:** data. I I think this is good. This is what we always see and yeah this must be good.  
**Mrigank Sinha:** both  
**Jan van Kranendonk:** So if you curve an exponential because then it gets less noisy but that number is good. So that model is there. The second question is then how do we strip linear or how do we calculate how deep we can  
**Mrigank Sinha:** And this model is also just based on a lower humility uh stuff.  
**Jan van Kranendonk:** strip.  
**Mrigank Sinha:** So there is also that role to be played and then makes it complicated. And let's for now make it less complicated.  
**Jan van Kranendonk:** Let's not do that.  
   
 

### 00:07:01 {#00:07:01}

   
**Jan van Kranendonk:** Let's keep it simple. Yeah, I agree. But but there's definitely  
**Mrigank Sinha:** But but one thing that we don't have here is the CO2 assumption.  
**Jan van Kranendonk:** some  
**Mrigank Sinha:** And I now whether I take 660 or I take 400 it will change a little bit maybe 10 20% on the  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** ppm which is a lot there.  
**Jan van Kranendonk:** Well, if you put it outside for five minutes and was reading 600, then I would say it's equal to ambient.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** And ambient in my book is typically for something or some heavy CO2 m is pumping around the parking lot and it's going inside, which is also an option in water, but I don't think both.  
**Mrigank Sinha:** I I would I will take it uh outside my laptop in a bit and I will sit in the sun for 20 minutes while I do some stuff just to check it one more time because I'm a bit I asked Olivia to do it but man the guy is uh bit fast and I'm not patient so I will have to I won't check it myself.  
   
 

### 00:07:55 {#00:07:55}

   
**Mrigank Sinha:** Okay. Uh all right.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** So next step model the spacetime meal as a function of uh ppm and solve iteratively for the uh CO2 uh ppm out and then get that into uh  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** yeah then then just get that uh relation with the mass flu rate because if we can get that  
**Jan van Kranendonk:** I'm going to type it up so that it's that we're on the same page.  
**Mrigank Sinha:** Yeah. Where are you typing it? Are you writing code or Yeah.  
**Jan van Kranendonk:** I'm typing in I can share screen if you want.  
**Mrigank Sinha:** Share screen.  
**Jan van Kranendonk:** I like this uh thing again. This uh thing you made is always  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** good.  
**Mrigank Sinha:** It's not as you can see my to the side. So I need  
**Jan van Kranendonk:** No, no, but look,  
**Mrigank Sinha:** to  
**Jan van Kranendonk:** it start with simple things, right? Let's start simple. So you give me a ppm in,  
**Mrigank Sinha:** Yeah.  
   
 

### 00:09:01

   
**Jan van Kranendonk:** we assume a ppm out, we get to an LMTD type of exponential curve thingy.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** So that's really it's got to be something like this, right? So we say BPM in BPM out and then you get an average. Yeah.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Okay. So then we have an average BPM. Then uh if you combine that with uh the in ppm you get the delta ppm. Then also given is uh  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** cubic meter per hour. And if you combine that with the delta ppm you get uh what do we get?  
**Mrigank Sinha:** Yeah, you get space time or totally  
**Jan van Kranendonk:** No. Uh we need we we need a  
**Mrigank Sinha:** capture.  
**Jan van Kranendonk:** space limit. Uh no it's actually not that. So we have simple mass balance, right? ppm delta time cub per hour gets you uh mole CO2 uh per hour. Okay, great. I'm going to connect this one.  
   
 

### 00:10:17 {#00:10:17}

   
**Jan van Kranendonk:** Come on. what's going on here you know okay so then this then if we got mole CO2 per hour uh what we will get actually from here you should be able to get ppm out And for that you need the ppm in and you need cubic meters per hour because that's a mass balance. And then you circle  
**Mrigank Sinha:** I would  
**Jan van Kranendonk:** back.  
**Mrigank Sinha:** Yeah. Yeah. There's just one because now we did that twice the last part.  
**Jan van Kranendonk:** Sorry.  
**Mrigank Sinha:** So you said you know the ppm in right that's a starting point we assume  
**Jan van Kranendonk:** Yeah. Yeah.  
**Mrigank Sinha:** uh ppm out you get the average lmtd this that  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** or whatever or actually you just get the delta ppm right so uh uh uh and you get that through the spacetime the lmtd average is is is what exactly Here it breaks then,  
**Jan van Kranendonk:** You're right. It breaks because the average LMTD ppm could  
   
 

### 00:11:49 {#00:11:49}

   
**Mrigank Sinha:** right? Because it  
**Jan van Kranendonk:** plug into a space time calculation. We say look space time yield is proportional to the average BPM inside the column.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** um and then you get a certain space-time yield because if you just use delta ppm based on  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** ppm out it's a circular reference then you're going to find the same ppm out as you had so so  
**Mrigank Sinha:** Exactly. So,  
**Jan van Kranendonk:** this should first go through a space time mute calculation good that we do  
**Mrigank Sinha:** so  
**Jan van Kranendonk:** this should also principle  
**Mrigank Sinha:** may maybe we should also do this in Excel once with a random value just to have that clear because then we know where it breaks because here  
**Jan van Kranendonk:** the delta ppm is not very interesting and  
**Mrigank Sinha:** No.  
**Jan van Kranendonk:** uh but the space-time yield calculation will give you  
**Mrigank Sinha:** It It will give us moles per second because we  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** have the meter wires. So,  
**Jan van Kranendonk:** Yeah.  
   
 

### 00:12:59

   
**Mrigank Sinha:** it will give us moles of CO2 per second and we have the meter cube per air.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** So that gives us a ppm out.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** And then when you plug that back in the ppm,  
**Jan van Kranendonk:** Out. You can redo calculation. So it needs to go through DY. Thank  
**Mrigank Sinha:** yeah,  
**Jan van Kranendonk:** you.  
**Mrigank Sinha:** it needs to go through the STY and then you can get it and then it should be it should be self uh because the ppm the ppm in is updated at  
**Jan van Kranendonk:** It should convert.  
**Mrigank Sinha:** every time step. So ppm in has now gone lower or higher or  
**Jan van Kranendonk:** Well,  
**Mrigank Sinha:** whatever.  
**Jan van Kranendonk:** then you rerun this one. So, every time step you convert this one.  
**Mrigank Sinha:** Yeah. So yeah.  
**Jan van Kranendonk:** Let's do a  
**Mrigank Sinha:** So every can you just open this one my uh soda stream and just do it there.  
**Jan van Kranendonk:** Which one?  
   
 

### 00:13:49 {#00:13:49}

   
**Jan van Kranendonk:** Sorry.  
**Mrigank Sinha:** If you go to the share drive soda stream  
**Jan van Kranendonk:** Uh,  
**Mrigank Sinha:** or no no it's on the share drive.  
**Jan van Kranendonk:** you send me something on WhatsApp.  
**Mrigank Sinha:** Uh, I haven't sent it to you yet.  
**Jan van Kranendonk:** You want me to uh save a picture of  
**Mrigank Sinha:** No,  
**Jan van Kranendonk:** this?  
**Mrigank Sinha:** I already have a picture. I'm saying instead of doing stuff on Excel,  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** just do it on Google Sheets on the share drive with a new because then it's all in one  
**Jan van Kranendonk:** Yeah. Yeah. Okay. Okay. Okay. So we go to nice Google  
**Mrigank Sinha:** place.  
**Jan van Kranendonk:** Drive share drive. So the stream where do you want to go for Sunni? No air purifier.  
**Mrigank Sinha:** Uh uh sorry let me check where I am  
**Jan van Kranendonk:** No.  
**Mrigank Sinha:** at. Uh let's just let's just create a new sheet.  
**Jan van Kranendonk:** If you create the seat, I will uh I will  
   
 

### 00:14:40 {#00:14:40}

   
**Mrigank Sinha:** Uh wait, where are you?  
**Jan van Kranendonk:** go  
**Mrigank Sinha:** It's the the Google sheet is called DAC Soda Stream. Are you in that?  
**Jan van Kranendonk:** I'm in the share drive. So the  
**Mrigank Sinha:** Yes.  
**Jan van Kranendonk:** stream  
**Mrigank Sinha:** And now if you go to Versuni and then go to DA Soda Stream. Yeah, there. And now just create a new sheet.  
**Jan van Kranendonk:** Okay,  
**Mrigank Sinha:** in.  
**Jan van Kranendonk:** let's test this one out. Yeah, we got BPM in,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** which is going to be 1,200.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Okay,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** then um then we got BPM out,  
**Mrigank Sinha:** Out.  
**Jan van Kranendonk:** which is uh 400\. I'm not make I'm just making this stuff up. Then we say uh average BPM.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Uh, we need to do a logarithmic average.  
**Mrigank Sinha:** Make average. So it's if you just  
**Jan van Kranendonk:** Let's look that  
**Mrigank Sinha:** do  
**Jan van Kranendonk:** up. Logarithmic mean.  
   
 

### 00:15:50

   
**Jan van Kranendonk:** So that is x \- y / ln x \- ln y. So it's going to be equals this minus this  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** and divided by ln x \-  
**Mrigank Sinha:** X.  
**Jan van Kranendonk:** ln y.  
**Mrigank Sinha:** Yeah. Okay.  
**Jan van Kranendonk:** So that makes total sense,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** right? Because the other one would be uh Yeah.  
**Mrigank Sinha:** 800\.  
**Jan van Kranendonk:** So, it's lower. Okay, perfect. So, it's good. Let's say keep this long  
**Mrigank Sinha:** Yeah. Okay.  
**Jan van Kranendonk:** average. And then we say space time.  
**Mrigank Sinha:** Yeah. So let's  
**Jan van Kranendonk:** We say equals this one /  
**Mrigank Sinha:** say  
**Jan van Kranendonk:** 400 times. What is the space mute at 400? Half the something like this.  
**Mrigank Sinha:** one E minus 6 or or Yeah.  
**Jan van Kranendonk:** Doesn't really matter. You can you can choose. Yeah.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Then we have uh nonwires.  
   
 

### 00:17:00 {#00:17:00}

   
**Jan van Kranendonk:** This is an input. We got 20 wires.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** L wires is half a meter.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** And this is mole per second per meter. So that means um we got capture rate.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** It's going to be this times this times yield time  
**Mrigank Sinha:** Yeah. Time.  
**Jan van Kranendonk:** 3600\.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** This is mole per hour because  
**Mrigank Sinha:** Why is it minus?  
**Jan van Kranendonk:** I typed minus what that's got the finger.  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** Okay. So that's great.  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** So it's a tiny amount of mole per hour. That makes sort of sense. Yeah.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** just uh do gram per hour. Okay, it's a very  
**Mrigank Sinha:** Yeah. I I think one step that we missed is that we need a room size for the ppms or a  
**Jan van Kranendonk:** small.  
**Mrigank Sinha:** volume because then you can find out the ppm uh in again, right?  
   
 

### 00:18:05

   
**Jan van Kranendonk:** Uh now that's in your script already, right?  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** So now you want to calculate ppm out again.  
**Mrigank Sinha:** But for this  
**Jan van Kranendonk:** No, we got cubic meter per hour.  
**Mrigank Sinha:** Yeah. Yeah. Let's  
**Jan van Kranendonk:** So that's 100 cubic meter per hour.  
**Mrigank Sinha:** say  
**Jan van Kranendonk:** And so the mass flow air mole flow air is this times 1300 / 29 mole per hour. Yeah. So that means ppm out equals uh this divided by this time 186\. It's very low. What the  
**Mrigank Sinha:** You don't have a total volume of the ppm.  
**Jan van Kranendonk:** f?  
**Mrigank Sinha:** So how are you finding out ppm out? Let's say you have a one I mean me cube room.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** So you know the total uh CO2 in the room and then you find the ppm out right that's how I am doing it now. So if you don't have a volume of uh the room then how are you going to find out how much ppm  
   
 

### 00:19:16

   
**Jan van Kranendonk:** No, no, I'm not calculating the room.  
**Mrigank Sinha:** out  
**Jan van Kranendonk:** This is just a convergence step for the column. I'm only in the column at the moment. So, the C2 mole flow in is going to be BPM in divided by a million.  
**Mrigank Sinha:** okay?  
**Jan van Kranendonk:** Uh,  
**Mrigank Sinha:** Ah.  
**Jan van Kranendonk:** that's a percentage times the mole flow of air.  
**Mrigank Sinha:** Ah.  
**Jan van Kranendonk:** So this is mole CO2 per hour in and then  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** CO2 out. I'm just taking some extra substeps to make sure is this minus um minus I  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** think this one right this is uh the capture rate so moles per hour. So now we have less CO2. So there's mole CO2 per hour again. And then there's the ppm out equals um this mole of CO2 per hour divided by this uh mole per hour uh times 26\. So we only capture tiny bits right pm.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** And so if I now were to plug this into this one.  
   
 

### 00:20:25 {#00:20:25}

   
**Jan van Kranendonk:** Oh come on. So,88. Boom. Why is this not  
**Mrigank Sinha:** Yeah,  
**Jan van Kranendonk:** changing?  
**Mrigank Sinha:** it did  
**Jan van Kranendonk:** I have a feeling the capture rate is not doing well.  
**Mrigank Sinha:** change.  
**Jan van Kranendonk:** We have 20 wires only. No, we got 40 wires per thing. So, we got 80 wires in total, right? So, this is in mini  
**Mrigank Sinha:** Yeah, but something is wrong because it should change or  
**Jan van Kranendonk:** We got 80 wires times half a meter.  
**Mrigank Sinha:** it  
**Jan van Kranendonk:** It's 40 m length times a space time yield time 3600\. So that is correct. Is this one okay?  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** This is one E minus 6\. Just going to go here. Okay.  
**Mrigank Sinha:** Why does your ppm out not change?  
**Jan van Kranendonk:** Yeah, that's crazy, right?  
**Mrigank Sinha:** Something is weird.  
**Jan van Kranendonk:** I What is this going on with Google Sheets?  
**Mrigank Sinha:** Can  
**Jan van Kranendonk:** There's literally C11.  
   
 

### 00:21:32

   
**Mrigank Sinha:** you  
**Jan van Kranendonk:** That's wrong. Minus capture rate. This one C12.  
**Mrigank Sinha:** Ah,  
**Jan van Kranendonk:** Okay,  
**Mrigank Sinha:** wait.  
**Jan van Kranendonk:** now we're going.  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** So now I'm converging 1108\. So this is what your algorithm does. 1107 1107.4  
**Mrigank Sinha:** Yeah. Okay. Fine. Uh,  
**Jan van Kranendonk:** for  
**Mrigank Sinha:** no, you change the average log. Yeah. You need to change the ppm. Yeah.  
**Jan van Kranendonk:** sorry this is how it goes right so now it's  
**Mrigank Sinha:** Okay. But that's already there now. So, it's fine.  
**Jan van Kranendonk:** converged and so that  
**Mrigank Sinha:** Yeah. The only Okay,  
**Jan van Kranendonk:** means  
**Mrigank Sinha:** I need to do the session state thing so that it doesn't hang the HTML. But, okay.  
**Jan van Kranendonk:** yeah so so the space I mean all the assumptions are in here but I think this is the basis of the algorithm So you do  
**Mrigank Sinha:** Sure.  
**Jan van Kranendonk:** this given a ppm in you will find uh essentially a capture rate and then your script already got the uh thing.  
   
 

### 00:22:33

   
**Jan van Kranendonk:** Um I can save this now set this.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Um  
**Mrigank Sinha:** So with that capture rate now it is going to find the new ppm in and then it's going to repeat repeat repeat repeat repeat and then  
**Jan van Kranendonk:** exactly now the PDM in stay constant over time  
**Mrigank Sinha:** everything no  
**Jan van Kranendonk:** step and so this one converges each time step until  
**Mrigank Sinha:** over a time step.  
**Jan van Kranendonk:** it's then it does  
**Mrigank Sinha:** Yes. But as soon as it converges then it goes to uh the next step right.  
**Jan van Kranendonk:** a time step and your room will solve to the next time step and lower the ppm or higher the ppm because that's a mass balance.  
**Mrigank Sinha:** Yeah. Okay.  
**Jan van Kranendonk:** that two people break.  
**Mrigank Sinha:** This will uh this should work and we should have some stuff uh here as  
**Jan van Kranendonk:** This won't  
**Mrigank Sinha:** standards.  
**Jan van Kranendonk:** work.  
**Mrigank Sinha:** Uh yeah so that we can see what okay this is then doable. This should be fine.  
   
 

### 00:23:22 {#00:23:22}

   
**Mrigank Sinha:** And I will implement this and then uh we see okay but but even then when we make all of this we will select a size and then we will play with it and then we will get to uh whatever but the size is not going to be close to the size that we have now. So it's going to be big anyway. You're again changing the log which is uh just  
**Jan van Kranendonk:** Sorry,  
**Mrigank Sinha:** yeah  
**Jan van Kranendonk:** I will I will no longer touch it. You have to cop this up in Python. I will no longer touch it. Sorry. It's good that it's good. This is how yesterday Blast and I were looking at some stuff for AC and  
**Mrigank Sinha:** you  
**Jan van Kranendonk:** also Blast got I my head is full of mucus. I have quite unfiltered I would say. But that's good. All right. I think the last step is to see how lean we can make this because this little tiny crappy model solves sort of the the airflow equation and we can screw.  
   
 

### 00:24:24 {#00:24:24}

   
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** If it's really on the extremes, I don't trust it. But if it's somewhere in the middle, I think this is good as good as anything to be  
**Mrigank Sinha:** Yeah. And if we if we get this then with the stripping we can improve it.  
**Jan van Kranendonk:** honest.  
**Mrigank Sinha:** We can get to a certain point where it's actually good and then you can  
**Jan van Kranendonk:** Yeah,  
**Mrigank Sinha:** do  
**Jan van Kranendonk:** because because essentially in the formula there is the in the space time I assume one E minus 6 that number should actually be a cell in the Excel sheet which is altered by the stripping leanness because  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** that's so if you plug in your plot there then you have everything what you want.  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** Then the question is let's talk invention time. We want to strip deeper.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** How do we do  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** it?  
**Mrigank Sinha:** Longer, higher temperature. Uh  
   
 

### 00:25:11 {#00:25:11}

   
**Jan van Kranendonk:** Okay. High temperature is for sure one. We know that longer. I'm not sure. Depends on whether it's equilibrium or not. I don't think it's I think it's surely equilibrium. I don't think it's really time limited at the moment. Residence time limited.  
**Mrigank Sinha:** No, as in try to have more stages but then need to  
**Jan van Kranendonk:** pages. That is definitely one.  
**Mrigank Sinha:** have uh different. So we could make it like a mini column but with a lot of stages.  
**Jan van Kranendonk:** Yeah,  
**Mrigank Sinha:** Although the effective number of stages really scale with height height and not just putting something there. Uh we can have a packed column. See if we can get two stages or two and a half, three that will already help a a lot, I think.  
**Jan van Kranendonk:** to be honest, I think the if you make a packed column and you splash in 50 cc's per second like we do in the duck box, too.  
   
 

### 00:25:59

   
**Jan van Kranendonk:** I think you sort of dist and you have a big airflow out then you distribute well in the in the back column. But if you do back column at that scale, it will be pretty much the ml distribution will be horrific. And so at the moment it drifts from top all the way in the in the in the in the let's say bubbly base. uh sub which is so if if already we would somehow make  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** it sort of a labyrinth that the droplet has to travel you know slowly being heated slowly getting to more  
**Mrigank Sinha:** and  
**Jan van Kranendonk:** watery right and because it will first it will puff out all the CO2 and then when it slowly becomes hotter it will start to buff out all the water and then the partial pressure of water goes up locally so  
**Mrigank Sinha:** yeah  
**Jan van Kranendonk:** therefore it will also buff out the remaining CO2 I think that's more or less the stage column  
**Mrigank Sinha:** but the problem there yeah now in the stripper is that we can no longer have an external heating in body or whatever the area doesn't make sense anymore.  
   
 

### 00:27:02 {#00:27:02}

   
**Mrigank Sinha:** So the HC and the area the heat transfer will not make sense. So you need to have area inside the stripper to do that.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** Well now so we are now off the soda part that was easy in a lot of ways because yeah it was just easier and we were at a scale where we could do anything.  
**Jan van Kranendonk:** Yeah. Yeah.  
**Mrigank Sinha:** Now it actually becomes closer to where we are and it's actually not that way it's actually this way. So, so we need to also design the stripper properly and really see whether uh that's a thing or not.  
**Jan van Kranendonk:** Yeah, but I think we're not even there yet. I think to design a small scale stripper, we can design something and then hope for the best, but we have to probably test it. I don't think we can model it. I I multiple stages. This is the best way to go for the deeper stripping. We know that we can strip box all the way down at low temperatures if we have a multiple stage.  
   
 

### 00:27:56

   
**Jan van Kranendonk:** I think multiple stages, let's not reinvent the wheel. Process technology has been for centuries stripping in stages. So throwing uh down the gauntlet Hot. Yeah.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Whatever. Cool. I don't care.  
**Mrigank Sinha:** Why is it tilted? What? Uh  
**Jan van Kranendonk:** Rich see you. If I'm now a droplet, I will fall here. Okay, different color because it's not visible from now on. Box is purple. Droplet falls in here. And I'm going to very slowly, it will take maybe what 10 minutes to get here. Yeah,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** we've thrown a droplet of loaded box onto a hot plate at some points. It deserves at least the water. It goes real fast. And I think honestly C2 also go fast. Now what we want? What we want? Let's go to the infinite case.  
   
 

### 00:29:24 {#00:29:24}

   
**Jan van Kranendonk:** What we want is a very high partial pressure of water here and a very low partial pressure of CO2 here because that corresponds to lean.  
**Mrigank Sinha:** Well,  
**Jan van Kranendonk:** Right? So this one is down. This one is up.  
**Mrigank Sinha:** we're  
**Jan van Kranendonk:** And um and here we want to well you will get the opposite obviously. So a low part pressure of water and high part pressure of CO2 because this is rich. And so the idea is that here at the bottom you boil out the water it goes up condenses like heat pipe really condenses along the way. So the heat transfer between left and right is very high because it's managed by it's essentially the heat pipe that we were making. By the way we're going to probably uh we need to cool this but  
**Mrigank Sinha:** Exactly. You need to cool  
**Jan van Kranendonk:** essentially what you're going to get is is a stream of rich box plus some  
**Mrigank Sinha:** down.  
**Jan van Kranendonk:** liquid water.  
   
 

### 00:30:32

   
**Jan van Kranendonk:** And so the more you go to the left, the leaner it is. Now this pipe, let's make it infinity long. Yeah, that's always good for the intuition. If you coil this up as a heat pipe, um the question is at some point you're going to be choking the heat pipe. So if it's too thin, you're going to be uh and training the droplets outward to the right. So that's a sizing issue. But we know we are only adding a droplet every what 20 seconds in the in the big thing. Probably every second, right? It's 20x higher. So every second the droplet goes in. So let's make this pipe 8 mm, I don't know, 5 mm. So it goes down and it's a stainless steel pipe and has a homogeneous temperature gradient.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** So we slowly heat it up and by the time it gets really hot and it loses all the water, it is very watery and therefore the CO2 pressure is very low and it strips out the last tiny bits of CO2.  
   
 

### 00:31:25 {#00:31:25}

   
**Jan van Kranendonk:** That would be my take. If you want to minimize  
**Mrigank Sinha:** uh you you need before the CO2 exit. So essentially you're saying a pot on top of the pot a coil and on top of the coil cooler and then that's how you are uh putting it at right.  
**Jan van Kranendonk:** Yeah. Yeah. But I there's one thing.  
**Mrigank Sinha:** So no no no you need the  
**Jan van Kranendonk:** I don't think you need the pot anymore.  
**Mrigank Sinha:** pot you you'll not create a heat pipe otherwise first of  
**Jan van Kranendonk:** Why? Why do you need a  
**Mrigank Sinha:** all that is your bulk of the uh fluid with the lowest  
**Jan van Kranendonk:** pot?  
**Mrigank Sinha:** partial pressure of CO2 right you  
**Jan van Kranendonk:** Why do you keep a bulk of fluid at that point?  
**Mrigank Sinha:** need high partial pressure of H2O at a certain point that's your bottommost stage right if you have a  
**Jan van Kranendonk:** Yeah,  
**Mrigank Sinha:** pipe you don't have high partial pressure of H2 to in any because you distribute  
   
 

### 00:32:11

   
**Jan van Kranendonk:** why not?  
**Mrigank Sinha:** it and then you you have because that's how  
**Jan van Kranendonk:** So the  
**Mrigank Sinha:** stripper works right you have very less fluid on every stage and you have a bulk fluid at the  
**Jan van Kranendonk:** the  
**Mrigank Sinha:** le stage because that's when you have the highest partial pressure of of S2 and then lower lower lower lower lower and  
**Jan van Kranendonk:** yeah I don't it's about resonance time and if we assume and I think that's to be honest my gut tells me it's probably safe assumption if we say kinetics is not limiting why do you need a long resonance time at the lower stage because that lower stage let's say okay the pot how big is the pot of course you have a pot how big is the pot is it 1 cc  
**Mrigank Sinha:** confusion.  
**Jan van Kranendonk:** 2 cc's 20 cc but the only thing you're changing there is the resonance time at the lowest partial  
**Mrigank Sinha:** Yeah. But but yeah,  
**Jan van Kranendonk:** pressure  
**Mrigank Sinha:** you are now thinking again about droplet flow coming in the strippers and uh we are not  
   
 

### 00:33:00 {#00:33:00}

   
**Jan van Kranendonk:** yeah  
**Mrigank Sinha:** having droplet flow anymore. We are having proper flow in the stripper. So it's it's going much faster in the pipe that you have drawn now.  
**Jan van Kranendonk:** Mhm.  
**Mrigank Sinha:** And it's not a droplet spending a lot of time in the pipe. So it is just goes down and  
**Jan van Kranendonk:** No, I understand. But I'm challenging your intuition because now your tummy is telling no,  
**Mrigank Sinha:** it  
**Jan van Kranendonk:** but you need to be in the column for a certain while. And the question is why he transfer  
**Mrigank Sinha:** Yeah. If if if if you're in a pot,  
**Jan van Kranendonk:** m  
**Mrigank Sinha:** you need to be on there for a certain while because it the mass transfer is the one that is actually limiting the residence time is all about mass transfer. It's the diffusion, the diffusion, not the kinetic part. Diffusion is what takes more time and therefore when you have a pot you have sort of a resonance time for everything to happen and whatever whatever  
   
 

### 00:33:51

   
**Jan van Kranendonk:** Now,  
**Mrigank Sinha:** whatever  
**Jan van Kranendonk:** I'm going to poke you because I want to challenge you on this one. This is my pot.  
**Mrigank Sinha:** yeah  
**Jan van Kranendonk:** It wants to see. I might be wrong. I'm just forcing you to think what is a pot and sizing sizing.  
**Mrigank Sinha:** can you draw a temperature profile over the entire thing so how hot your pot is and how hot the pipe is and at what points  
**Jan van Kranendonk:** So I'm guessing how the temperature profile goes is something like this. This is temperature profile. I'm saying a pipe is also a pot. It's just a very small pot or it's you know. So I don't want to just assume okay there must be a pot. It's okay. Here's the story.  
**Mrigank Sinha:** No, I agree.  
**Jan van Kranendonk:** We had distillation in team zero.  
**Mrigank Sinha:** I agree.  
**Jan van Kranendonk:** Yeah. And team one, team two had distillations. How did we do it?  
   
 

### 00:34:43

   
**Jan van Kranendonk:** The capillary heat pipe distillation. We essentially made one part of heat pipe cold,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** other side hot. We put a mixture in the middle and we got pure metthanol on one side and pure water on the other side.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** And we got a nice temperature  
**Mrigank Sinha:** But there were limitations of that, right?  
**Jan van Kranendonk:** gradient.  
**Mrigank Sinha:** It was limited by flow rates. If you have high flow rates, then it didn't work.  
**Jan van Kranendonk:** Of course.  
**Mrigank Sinha:** And therefore,  
**Jan van Kranendonk:** Of course.  
**Mrigank Sinha:** yeah. So,  
**Jan van Kranendonk:** And my point is is it's a sizing matter.  
**Mrigank Sinha:** we have high.  
**Jan van Kranendonk:** So,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** uh I didn't put any dimensions on this drawing,  
**Mrigank Sinha:** What I am trying to say is for any mini this will work. I'm not saying it will not. I think it will work.  
**Jan van Kranendonk:** but  
**Mrigank Sinha:** quite a quite quite quite well and maybe there was a way to go but for a flow rate which is a few ml per minute or something like that which actually comes uh like a flowing stream.  
   
 

### 00:35:29

   
**Jan van Kranendonk:** yeah.  
**Mrigank Sinha:** Yeah. Then your time spent and to get hot is not that much. And then my gut says okay you need at  
**Jan van Kranendonk:** Oh, okay then. I I respect your gut.  
**Mrigank Sinha:** least  
**Jan van Kranendonk:** I mean, it's it can be done. The only thing I want to get out of your system, out of your intuition that a stripper looks like this.  
**Mrigank Sinha:** no that is fine.  
**Jan van Kranendonk:** That is not true.  
**Mrigank Sinha:** It can look anything.  
**Jan van Kranendonk:** That is not true because if you do a So,  
**Mrigank Sinha:** It can look  
**Jan van Kranendonk:** so if you want to be small and you want to be uh more efficient,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** you need multiple stages. And I'm thinking that this length heck it might be 1 meter 8 deman tube. If you coil it up then you still have a stripper like this. The only thing is what you do is instead of having zero resonance time in the stripper pipe and five minutes in the sump we say it's going to spend one minute at every stage of the column.  
   
 

### 00:36:17

   
**Jan van Kranendonk:** And I think that's where we need to go to strip deeper because then you're going to go to a multi-stage column. I think we agree on it. I'm just I'm being an ass bit, but I I I do want to challenge  
**Mrigank Sinha:** I agree but but but you don't know I always think of how I am going to build it.  
**Jan van Kranendonk:** you.  
**Mrigank Sinha:** You can't have an inclined coiled up thing because then you have upstreams and that will block the flow of gas that is coming out. So you if you have want to have coil it it needs to be uh going up and not at an angle.  
**Jan van Kranendonk:** Yep.  
**Mrigank Sinha:** Right? So if you put a coil and you put it at an angle,  
**Jan van Kranendonk:** When you I'm not sure. Yeah.  
**Mrigank Sinha:** you will have points where the liquid has to climb and therefore has to fill up the coil and not leave space for gas, right?  
**Jan van Kranendonk:** No, but if you Okay,  
**Mrigank Sinha:** Or not.  
   
 

### 00:36:58

   
**Jan van Kranendonk:** we mean the same thing. So for me, this is an inclined pipe. You buy a pipe of 1 meter,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** it's inclined. That's a big thing. It's not very handy. If you coil it up,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** it will have a constant inclination. It will droop down, right? It's the same thing. If you coil it up, if I take this literally, if I take a piece of paper, draw a diagonal line. If I roll it up, I get my coil, right?  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** And it will always go down.  
**Mrigank Sinha:** Yeah. But now your coil is vertical and and  
**Jan van Kranendonk:** Making a wrong metaphor here.  
**Mrigank Sinha:** How were you?  
**Jan van Kranendonk:** Sorry.  
**Mrigank Sinha:** Yeah. Because  
**Jan van Kranendonk:** No, but if I take a piece of pipe,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** a piece of pipe put like this is equivalent to a piece of pipe going like this.  
   
 

### 00:37:51

   
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** Yeah. So that's what I mean.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** Then it's uh then it's a but then again  
**Jan van Kranendonk:** Now we mean that's why I said I think we mean the same thing.  
**Mrigank Sinha:** I  
**Jan van Kranendonk:** But for me to draw it, this would be my drawing and then you coil it up.  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** So that comes better in I honestly think this might work to be more  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** efficient.  
**Mrigank Sinha:** Yeah. So that that is that is actually good and we could have that because it does spend then more time on the on the thing.  
**Jan van Kranendonk:** on the trace actually on the  
**Mrigank Sinha:** Yeah. All you need to do is make sure that doesn't block the flow.  
**Jan van Kranendonk:** ST and there's nice  
**Mrigank Sinha:** So the pipe is large enough so that it doesn't fill it up.  
**Jan van Kranendonk:** calculations for that the entrainment limit for heat pipes for example liquid versus uh solid  
**Mrigank Sinha:** But but but coming back to your uh uh pot part, I think the pipe is not going to be as hot as the heat source, right?  
   
 

### 00:38:40

   
**Mrigank Sinha:** Where is the heat source? The heat source is in the small pot, correct?  
**Jan van Kranendonk:** Now I I would literally I would take a pipe at the first part I would put  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** cooling fins. It's a standard pipe so actual conduction is not that much.  
**Mrigank Sinha:** Yeah. Yeah.  
**Jan van Kranendonk:** I would put an aluminum clamp around it at some section can be 65 cm.  
**Mrigank Sinha:** Okay. And  
**Jan van Kranendonk:** Heat it up to 120 or so and setting of a temperature. That's your sump.  
**Mrigank Sinha:** he  
**Jan van Kranendonk:** But it's just a section of the pipe. That's your sump. And it will pass through the sump and it will flow. You know, maybe you can do a little siphon in there. So you have an overflow. So it's actually, you know, clogging or boiling there or something. I don't know. And then you have an insulated section of diagonal going up.  
   
 

### 00:39:17

   
**Mrigank Sinha:** Okay. Yeah.  
**Jan van Kranendonk:** And um and what will happen is the whole pipe is super cold. So you start to heat that point. A droplet will hit that point. Droplet will boil, right? What does it produce? It will produce water vapor. Water vapor will travel up the pipe. will condense on the cold pipe. What happens? A lot of heat transfer. So it's a heat pipe. So the whole pipe starts to heat up but first the section next to your thing because the first thing the the steam does it it touches the cold pipe next to the heating section. So it will get a gradient and we've seen that with the dissolation really neatly. And so that way you generate this heat front and then um every time there's also a droplet flow stream flowing there if water condenses there it will heat up the solvent as well. And so that's how it will very gently be heated.  
   
 

### 00:40:04

   
**Jan van Kranendonk:** At the first start, it will start lose some CO2 and maybe water vapor, but mostly CO2. CO2 comes free first and then the water. I think that's Well, is that true? Let's verify that. I think  
**Mrigank Sinha:** Not necessarily.  
**Jan van Kranendonk:** so.  
**Mrigank Sinha:** Water starts earlier to come out. uh already 95 or something degrees it will start to come out and then but but yan a lot of stuff right heat transfer is one to be facilitating the heat transfer you need the area and a pipe section for an any meaning everything is fine you don't need a lot of area but for a flow which is 100 times more than that or uh 20 times or whatever you need 20 times more area and a pipe doesn't have that much area or or or or at least you need a very long pipe and then coil it in the end it's also about whether you're able to transfer the heat or not. So that is my point because when I say pot a pot is something with a lot of area inside it.  
   
 

### 00:41:03

   
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** So it's like heaters or something like that or or  
**Jan van Kranendonk:** Okay. I will challenge you on that.  
**Mrigank Sinha:** something in  
**Jan van Kranendonk:** Does a pot have a lot of heat area? Okay. I'm not  
**Mrigank Sinha:** my head when I see a stripper for this then I will put a lot of area in the pot somehow because then then you can actually transfer that much heat to do that. And also if you just put clamps of heating sort of along the way then your gradients are because you you you should get a gradient of hottest to the coldest right and and that's how you jump the wheel curve or not  
**Jan van Kranendonk:** Yeah, but I don't see. So,  
**Mrigank Sinha:** wish.  
**Jan van Kranendonk:** you're describing a multi-stage column with paste, but the best multi-stage column is actually continuous stage column,  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** which essentially is a pipe. You can put packing in there. You can put the blow flow blocking.  
   
 

### 00:42:00

   
**Jan van Kranendonk:** can make a diameter bigger to you know that's a sizing challenge and so  
**Mrigank Sinha:** Perfect.  
**Jan van Kranendonk:** I heating it at any different location than the sump or the lowest point is nonsense in my brain. So yes, you're right. There's a lot if there's let's say 2 liters per minute coming through then it's a big pipe. Yeah. Um but what I know is that if you're at that stage you need just packing and the column and then you don't have mount distribution right but if you do a vertical column on this size what you will get is droplets will fall down and will bypass all the stages. So to solve that issue you put it inclined and you coil it up to make it not super big out of the package. So that's a way of solving that problem and then you can have a controlled flow down and I'm not I didn't say any  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** diameter. Okay, I said 1 cm, but that's just my tummy, but but probably it's bigger or small.  
   
 

### 00:42:53

   
**Jan van Kranendonk:** I don't care. Um, we were able to distill quite a bit in the in the in the wicked column which was at some point was a 1  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** cm internal. We even had smaller ones. Um, but but that's a matter of sizing and I would say first we need to know how much solvent we need to bypass. But I think this will get you to a deeper link, right? A multi-stage score and then you the bottom very hot.  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** And I do think that so the the  
**Mrigank Sinha:** It is worth a try because I've been also thinking about alternative stripping and how we can get it smaller and doing whatever. I like what you're trying to do with the residence time and to be honest we had a chat about this earlier as well I think sometime and uh yeah but  
**Jan van Kranendonk:** How could we test this the cheapest way? I think let's not coil anything yet.  
   
 

### 00:43:47 {#00:43:47}

   
**Mrigank Sinha:** but  
**Jan van Kranendonk:** Let's just put the insulated pipe because straight pipes are simple. We pump in some liquid with a u one of those green tiny pumps. The one that has the thingy, you know, so you can control nicely the mass flow. You set it to a certain mass flow. You put a heater clamp on it. We insulate it. See what goes. And then we start adding stuff on the inside, fins, big diameters, do stuff, whatever. But ideally, we would be able to strip to a very low uh  
**Mrigank Sinha:** Ah yeah we can try just  
**Jan van Kranendonk:** lean and then maybe  
**Mrigank Sinha:** have a long pipe and we can also just coil  
**Jan van Kranendonk:** right past the let's say past the heated block, you would do a little dent in the siphon to have our siphoning action. So you actually do get a sort of like a because otherwise air will go into the tube, right? That's not good.  
   
 

### 00:44:37

   
**Jan van Kranendonk:** So you would sort of make a toilet exit just to make sure the air doesn't pass in. After that, it's just cooling.  
**Mrigank Sinha:** Yeah. So that toilet exit needs to be a bit bigger as well. But but yes uh uh I get your point. So have a coil thingy towards the end. You just make a toilet exit and put  
**Jan van Kranendonk:** Yeah. Does do you need to call before the toilet siphon or after? I think before actually because you want  
**Mrigank Sinha:** for the for the  
**Jan van Kranendonk:** to you want to prevent you want to prevent hot box being in contact with air.  
**Mrigank Sinha:** exit.  
**Jan van Kranendonk:** So you before you go to the siphon you cool it. So you have cold box through the siphon and that contacts air. Siphon is there to keep the air out.  
**Mrigank Sinha:** Yeah. Yeah. Yeah. I mean when the siphon starts to go up, you can start cooling there and then  
   
 

### 00:45:30

   
**Jan van Kranendonk:** Yeah, probably integrated bit. But like the most like if you do functional thing, you have a pipe insulated going down down down down down. You have a heated block, then you have a cooling block and then you have a siphon. And the siphon is is a water lock essentially just to keep the air out and cold box will come out through the siphon. If you fill the pipe more and faster, the siphon will flow faster. So that will keep the level at the top of the siphon just as we always have. And then at the top you have your inlet of bucks and your outlet of CO2. And after outlet of CO2 you cool down a lot. So you reflux water as well. I think in general you also want to do that. That will help the whole column like we always have played with.  
**Mrigank Sinha:** and the diameter of the pipe because I think 4 mm inner will fill up or it's capital  
   
 

### 00:46:16

   
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** enough right  
**Jan van Kranendonk:** Yeah. So you need you have a sort of a capillary minimum diameter which is typically eight I would say.  
**Mrigank Sinha:** so  
**Jan van Kranendonk:** Uh and then at some point you have entertainment. Uh you can do a math on the labor  
**Mrigank Sinha:** yeah but then if it's a 10 mm pipe it becomes a huge  
**Jan van Kranendonk:** number.  
**Mrigank Sinha:** clunk and and then you are thinking hey why don't I just make it 20 mm and make a a traditional stripper out of it and because 10 mm pipe to  
**Jan van Kranendonk:** That's also an option.  
**Mrigank Sinha:** coil you have a minimum sort of radius right so it's going to be this big you  
**Jan van Kranendonk:** Yeah, but my gut tells me that if you Okay,  
**Mrigank Sinha:** can't  
**Jan van Kranendonk:** so this big radius is not that big compared to the 25 liter package. So, it's easy to insulate and you have a way longer resonance time in your stripper at different stages because it has to go down like this.  
   
 

### 00:47:08

   
**Jan van Kranendonk:** So, it's slower. I think if you do a straight tube with packing even,  
**Mrigank Sinha:** Essentially,  
**Jan van Kranendonk:** well, it might not distribute and it might not spend time at all the stages. It can work. I agree. That's the other  
**Mrigank Sinha:** essentially we are building a stripper with more time on the top.  
**Jan van Kranendonk:** put.  
**Mrigank Sinha:** So that that is just what what it is, right? It is just a a stripper with a smaller pot but just longer and it's coiled up. So it's so that's how I see it.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** Then it's the same thing and the bottom part is a bit less sure but yeah and then you need  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** to  
**Jan van Kranendonk:** I I always like to if for your intuition just make everything in infinite long or 100 meter long  
**Mrigank Sinha:** um  
**Jan van Kranendonk:** thing then at at that stage you have a long resonance time at any stage in your column and therefore you have pure equilibrium and therefore you have perfect column right so you get 100% efficiency stage three  
   
 

### 00:47:58

   
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** efficiency but of course you don't want to coil 100 meters but probably okay what's  
**Mrigank Sinha:** No.  
**Jan van Kranendonk:** the smallest back so this is just one idea right I'm unfiltered you can also do a short stack with some packing My gut tells me you're going to bypass too quickly and you're going to not have well mixed  
**Mrigank Sinha:** No. Because because there are there are two things, right? There is one is the uh the coil then you don't have anything inside the pipe.  
**Jan van Kranendonk:** and  
**Mrigank Sinha:** It's flowing but it's now taking more time to come out. And the second is a packing which slows you down and you just have a straight stripper. So you have a dense packing and it's dense enough that it slows it down but not dense enough that it blocks gas  
**Jan van Kranendonk:** Yeah,  
**Mrigank Sinha:** or blocks uh stuff like that.  
**Jan van Kranendonk:** I mean essentially it's the same approach. You need to size it well and if you are able to size a a packing filler so  
   
 

### 00:48:44

   
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** that it doesn't entray and it doesn't bypass.  
**Mrigank Sinha:** So,  
**Jan van Kranendonk:** The only thing is in the long coil it cannot bypass. There's no way there's no shortcuts, right? It has to go all the way around with the thing if it touches the wall and everything goes through the wall because gravity assist. So there's a nonlinearity there. That's what my gut tells me. But both could work to be honest.  
**Mrigank Sinha:** I remember you you made these French fries,  
**Jan van Kranendonk:** You can test both.  
**Mrigank Sinha:** packing ones. We put them in the 10x outside.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** Uh they do go bad after a while to be honest because they are whatever. But something like that it forces it to go diagonal and then diagonal and then diagonal and then like that or whatever. So it it it does the same thing.  
**Jan van Kranendonk:** Yeah.  
**Mrigank Sinha:** and the packing that we have now. Maybe it's good to try that out because that also has mesh and maybe there are finer meshes than that or more uh they made  
   
 

### 00:49:38

   
**Jan van Kranendonk:** What's the smallest diameter of that backing you can  
**Mrigank Sinha:** it custom for us.  
**Jan van Kranendonk:** buy?  
**Mrigank Sinha:** So maybe we can ask them to make it custom and see if they can really make small thin ones or tiny ones and uh and stuff like that.  
**Jan van Kranendonk:** I don't know.  
**Mrigank Sinha:** Maybe  
**Jan van Kranendonk:** I think these packings assume something and that's that it's not in the capillary regime at the moment. If you want a long resonance time multi-staged column in capillary regime is something that changes the game completely. And so my dummy says capillary s\*\*\* is always annoying in trays and columns. We even made a a tray column once for the das. Remember those? But that has a steady state working but not dynamically problem that it's such vacuum all the way in.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** This is the first column of the mini had tra. We have been here before and we tried  
**Mrigank Sinha:** Bubbly cup. Yeah. Yeah.  
   
 

### 00:50:28 {#00:50:28}

   
**Jan van Kranendonk:** multi  
**Mrigank Sinha:** We have been here before and then we but but it's uh we always had to come back to it because it was never  
**Jan van Kranendonk:** looking at the clock. Let's take a step back. I think this was truthful.  
**Mrigank Sinha:** released.  
**Jan van Kranendonk:** I think also it shows that to do a pop plus successfully we need to push the limits of our mini design. It needs to be more efficient with multi-stage stripping. It will need very good space by you know optimizing the fan air. If you first make the absorber model that's the least amount of work and we can check whether it's even feasible on absorber side. If it's absorber side feasible or you say we're missing a factor of two factor of two could be done by the stripping not a factor of 10 I would say but definitely a factor of two. If you can get from lean 10% to lean 5% that would be huge, right? So that that is a big thing and we probably will learn something along the way.  
   
 

### 00:51:22 {#00:51:22}

   
**Jan van Kranendonk:** Hang on, I need to take this. Sorry.  
**Mrigank Sinha:** Yeah. And also to strip fast. That's also something.  
**Jan van Kranendonk:** Sorry, this was the the guy who is rebuilding my house.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Yeah,  
**Mrigank Sinha:** Has it started or Oh,  
**Jan van Kranendonk:** man. My house nearly finished. Yeah, they're really doing a good job. So,  
**Mrigank Sinha:** wow.  
**Jan van Kranendonk:** it looks amazing. Now, I'm able to uh come back. I will come back on Sunday. So, I'll be there on Monday, which is King's Day,  
**Mrigank Sinha:** Okay.  
**Jan van Kranendonk:** but we'll run the AC maybe or at least prepare. Yeah, I like this a lot. I think it's good. I think it's uh worthy. The only thing is we made this multi-stage stripping model once, but since box, we need to maybe start from scratch and then redo that model again once more just to get a sense what it would save us.  
   
 

### 00:52:48 {#00:52:48}

   
**Mrigank Sinha:** Yeah. Let's do that together. When I find time, I'm going to run it down. See what was Yeah.  
**Jan van Kranendonk:** I think first things first I would say first good observer model update because it's simple and quick and then  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** we think ah this could be feasible and this would be the curve and we can even show it to pursuit like hey this would the machine  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** do and then assume we can get the stripping right or dummy feel like okay we can get multi-stage stripping 2x factor then we can reach these numbers and we can because part of the deal with sunni is that we do all this modeling and simulations and do it well but this would be a simple model tell feeling ourselves and then we know we can get stripping at 2x  
**Mrigank Sinha:** Yeah. So my my goal is also why I wanted to do this is if we agree on whatever we have there  
**Jan van Kranendonk:** improvement  
**Mrigank Sinha:** it is good to show this in the in the meeting next week and because it  
   
 

### 00:53:34 {#00:53:34}

   
**Jan van Kranendonk:** I think so yeah you can get the the little lid stream uh thingy next  
**Mrigank Sinha:** shows that  
**Jan van Kranendonk:** week then we can show it right so okay this is what we got now and what we think we can do and it will  
**Mrigank Sinha:** yeah exactly so just to show hey this is  
**Jan van Kranendonk:** be this  
**Mrigank Sinha:** where we stand this is whatever we have been trying to also put our brains back to it But this is basics. Lot of stuff has to go behind  
**Jan van Kranendonk:** Maybe if you just put one slider in a gunk of assumed lean percentage  
**Mrigank Sinha:** it.  
**Jan van Kranendonk:** of the stripping. So for ourselves so we can slide it back and forth see how that goes and then we say look we see we can do it but then the lean percentage needs to be this for that we need to run some experiments that will actually take some time because that's actually a lot of work but putting this into the model is quite simple I would say because you can  
   
 

### 00:54:21 {#00:54:21}

   
**Mrigank Sinha:** basically make the STY also a function of the lean percentage of stripping and  
**Jan van Kranendonk:** just yeah if you have your curve fit of the spacetime yield and  
**Mrigank Sinha:** then  
**Jan van Kranendonk:** then put it into the lean but put the lean as a slider not from a model or data just as a slider if we and then we we look at And we say look we agree that it can be 5% but it will probably not be lower than that or it can be 8% or 6 like or we say ah we have to strip it all the way down to 4%. But to do that you need to go to we can look up the box data and say when we go to 150 Celsius okay that's not very realistic or it is maybe I don't know. So we already have a lot of intuition there. So if it's a simple slider on percentage, we can probably say something about it.  
**Mrigank Sinha:** Yeah.  
**Jan van Kranendonk:** Nice. All right. Thanks a lot, man.  
   
 

### 00:55:07 {#00:55:07}

   
**Mrigank Sinha:** Yeah. All right. Cool. I will get on it in a while.  
**Jan van Kranendonk:** How was today? Did you do a duck box work or  
**Mrigank Sinha:** Yeah. We made an entire uh list last time Blas and I went through it.  
**Jan van Kranendonk:** not?  
**Mrigank Sinha:** Uh he already prepped stuff for the safety box for Paul. Uh I found stuff that I had to find. Didn't also find some stuff. So I will order them. And uh now I'm going back until 4 to finish uh some other stuff. We are trying to see how we can do all the wiring and whatever. It will take time but at least getting back to it and then uh yeah.  
**Jan van Kranendonk:** Okay.  
**Mrigank Sinha:** So a lot of dots on the eyes. You will probably not see it immediately but uh it's  
**Jan van Kranendonk:** Did I did have a talk with Leonard yesterday because I had some things I wanted to discuss with you.  
**Mrigank Sinha:** happening  
**Jan van Kranendonk:** Not for now, but so that your uh name. Ah, yeah. We made a sketch mockup of a in a mini ISA which I think might be feasible and AC.  
**Mrigank Sinha:** mini. Ah nice.  
**Jan van Kranendonk:** So uh next week I will take you through it and see and then if we refine it a bit you and me we bring it back to Leonard he can do a prep cut and then we can discuss whether it's worth it.  
**Mrigank Sinha:** Okay, cool. All right.  
**Jan van Kranendonk:** See like that.  
**Mrigank Sinha:** Yeah.  
   
 

### Transcription ended after 00:56:29

*This editable transcript was computer generated and might contain errors. People can also change the text after it was created.*