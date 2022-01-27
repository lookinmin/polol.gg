import { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { PlayerCard } from './PlayerCard';

const init_pos_const = [
    { transform: "translate(0%,0%)" },
    { transform: "translate(0%,0%)" },
    { transform: "translate(0%,0%)" },
    { transform: "translate(0%,0%)" },
    { transform: "translate(0%,0%)" },
    { transform: "translate(0%,0%)" }];
const old_pos_coonst = [
    { transform: "translate(-200%,0%) ", transitionDelay: "0s" },
    { transform: "translate(-150%,-120%)", transitionDelay: "0.25s" },
    { transform: "translate(0%,-140%)", transitionDelay: "0.5s" },
    { transform: "translate(150%,-120%)", transitionDelay: "0.75s" },
    { transform: "translate(200%,0%)", transitionDelay: "1s" },
    { transform: "translate(0%,0%)", transitionDelay: "0s" }];
const init_move_const = [
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" },
    { transform: "translate(0%,0%) scale(0.9)", visibility: "hidden" }];
var old_move_const = [
    { transform: "translate(40%,-360%)", transitionDelay: "0s" },
    { transform: "translate(210%,-360%)", transitionDelay: "0.25s" },
    { transform: "translate(380%,-360%)", transitionDelay: "0.5s" },
    { transform: "translate(550%,-360%)", transitionDelay: "0.75s" },
    { transform: "translate(110%,-240%)", transitionDelay: "1s" },
    { transform: "translate(295%,-240%)", transitionDelay: "1.25s" },
    { transform: "translate(480%,-240%)", transitionDelay: "1.5s" },
    { transform: "translate(110%,-120%)", transitionDelay: "1.75s" },
    { transform: "translate(295%,-120%)", transitionDelay: "2s" },
    { transform: "translate(480%,-120%)", transitionDelay: "2.25s" },
    { transform: "translate(110%,0%)", transitionDelay: "2s" },
    { transform: "translate(295%,0%)", transitionDelay: "2.25s" },
    { transform: "translate(480%,0%)", transitionDelay: "2.5s" }];
export const Cardpage = () => {
    const [cardset, setcardset] = useState(["init", "new"]);
    const [curline, setcurline] = useState("TOP");
    const [pos, setpos] = useState(init_pos_const);
    const [move, setmove] = useState(init_move_const)
    const [tp, settp] = useState(false);
    const ref = useRef(null);

    const initcard = (e) => {
        if (cardset[0] == "init") {
            setpos(old_pos_coonst)
            setcardset(["folded", "old"])
        }
        if (cardset[0] == "folded") {
            var line;
            setcurline(e.target.id + "");
            switch (e.target.id) {
                case "TOP":
                    line = 0;
                    break;
                case "JGL":
                    line = 1;
                    break;
                case "MID":
                    line = 2;
                    break;
                case "AD":
                    line = 3;
                    break;
                case "SPT":
                    line = 4;
                    break;
            }
            var tp = [...init_pos_const];
            tp[line] = { transform: "translate(-590%,0%)", transitionDelay: "1.5s" };
            setpos(tp);
            settp(true);
            setTimeout(() => { setmove(old_move_const) }, 3000);
            setcardset(["unfolded", "old"])
        }
        if (cardset[0] == "unfolded") {
            setmove(init_move_const)
            setTimeout(() => {
                setpos(init_pos_const);
                setTimeout(() => {
                    setpos(old_pos_coonst)
                }, 1000);
                setcardset(["folded", "old"])
                settp(false)
            }, 1000);
        }
    }
    useEffect(()=>{
        ref.current.scrollIntoView({  behavior: 'smooth',block:'end' });
    },[])
    
    return (
        <>
            <div className='box'>
                <div ref={ref} onClick={initcard} className={'cardbox ' + (cardset[0] == "unfolded" ? 'movemove' : '')}>
                    <Card pos={pos[0]} backimg={"TOP"} cardset={cardset} key={1} />
                    <Card pos={pos[1]} backimg={"JGL"} cardset={cardset} key={2} />
                    <Card pos={pos[2]} backimg={"MID"} cardset={cardset} key={3} />
                    <Card pos={pos[3]} backimg={"AD"} cardset={cardset} key={4} />
                    <Card pos={pos[4]} backimg={"SPT"} cardset={cardset} key={5} />
                    <Card pos={pos[5]} backimg={"LCK"} cardset={cardset} key={6} />
                    {tp ? <PlayerCard setmove={setmove} Line={curline} move={move} /> : ''}
                </div>
            </div>
            <div className="underForPredict">
                <h2 id='underPolo'>POLOL.GG</h2>
                <div className="exp">
                    <div className="space"></div>
                    <div className="space1">
                        <p id='explanation1'>AI를 활용한 LCK 경기 결과 예측 프로그램입니다.</p>
                        <p id='explanation2'>상업적 이용을 금합니다.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
