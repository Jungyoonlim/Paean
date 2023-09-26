import { Card as AntdCard, Radio } from "antd";
import EmptyImg from "assets/image/empty.svg"; // put in the svg image for cards
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import http from "../../utils/api";
import "./styles.scss";

interface Deck {
    id: string;
    title: string; 
    description: string;
    visibility: string;
}

interface Card {
    front: string;
    back: string;
    hint: string; 
}

const CreateCards = () => {
    const navigate = useNavigate();
    const emptyCard = {
        front: "",
        back: "",
        hint: "",
    };
    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState([emptyCard]);
    const [originalCards, setOriginalCards] = useState([]);
    const [fetchingDeck, setFetchingDeck] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchingCards, setFetchingCards] = useState(false);

    const flashcardUser = window.localStorage.getItem("flashcardUser");
    const { localId } = (flashcardUser && JSON.parse(flashcardUser)) || {};

    useEffect(() => {
        fetchDeck();
        fetchCards();
    }, []);

    const { id } = useParams();
    
    const fetchDeck = async () => {
        setFetchingDeck(true);
        await http
            .get(`/deck/${id}`)
            .then((res) => {
                const { deck: _deck } = res.data || {};
                setDeck(_deck);
                setFetchingDeck(false);
            })
            .catch((err) => {
                setFetchingDeck(false);
            });
    };

    const fetchCards = async () => {
        setFetchingDeck(true);
        await http
            .get(`deck/${id}/card/all`)
            .then((res) => {
                const { cards } = res.data || {};
                if (cards.length !== 0){
                    setCards(cards);
                }
                setOriginalCards(cards);
                setFetchingCards(false);
            }) 
            .catch((err) => {
                setFetchingCards(false);
            });
    };

    const handleUpdate = () => {

    };

    const addCard = () => {

    };

    const removeCard = () => {

    };

    const handleAddCards = async (e: any) => {

    };

    const { title } = deck || {};

    return (

    );
};

export default CreateCards; 