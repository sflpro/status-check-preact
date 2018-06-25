import { sflAvatarUrl } from '../../../config';

export const genEmployeeImgSrc = (fullname) => {
    const imgSrc = `${sflAvatarUrl}${fullname.split(' ')[0].replace(' ', '-')}-50x50.jpg`;
    return imgSrc;
};

export const generateLinkTo = (id) => {
    const to = {
        pathname: `/employee/${id}`,
        state: {
            modal: true,
        },
    };
    return to;
};
