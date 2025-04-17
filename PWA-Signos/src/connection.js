import responseToSignotation from './translator/LSETranslator.js'

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize?raw=true";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

export const connection = async (dispatch, image) => {
    try {
        dispatch({ type: "set_loading" });
        const response = await fetch(
            VISSE_BACKEND_URL /*"http://localhost:3999/recognize/raw"*/,
            {
                method: "POST",
                body: image,
            }
        );
        const responseData = await response.json();
        const [signotationElems, signotation] = await responseToSignotation(responseData);
        dispatch({ type: "set_signotation", signotation: signotationElems });
        const url = new URL(
            SIGNARIO_URL +
                new URLSearchParams({
                    s: signotation,
                    // l es opcional
                })
        );

        const videosResponse = await fetch(url, {
            method: "GET",
        });
        const videosData = await videosResponse.json();
        dispatch({ type: "signario_response", videos: videosData["signs"] });
    } catch (error) {
        const message = error.message.includes("Failed to fetch")
            ? "No se ha podido reconocer la imagen."
            : error.message;

        dispatch({ type: "error_response", error: message });
    } finally {
        dispatch({ type: "set_loaded" });
    }
};

