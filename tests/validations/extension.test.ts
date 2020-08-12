import FileExtension from "../../src/Validations/FileExtension";
import {makeBoel} from "../../src/BoelProvider";

describe("FileExtension",()=>
{
    test("tests single extension",()=>
    {
        let v = new FileExtension('jpg');

        expect(v.validate('photo',{photo:'myprofile.jpg'})).toEqual(true);
        expect(v.validate('photo',{})).toEqual(true);
        expect(v.validate('photo',{photo:'document.pdf'})).toEqual(false);
        expect(v.validate('photo',{photo:'document'})).toEqual(false);
    });

    test("tests multiple extensions",()=>
    {
        let v = new FileExtension('jpg,jpeg,  png, gif ');

        expect(v.validate('photo',{photo:'myprofile.jpg'})).toEqual(true);
        expect(v.validate('photo',{photo:'apic.png'})).toEqual(true);
        expect(v.validate('photo',{photo:'long.file-name.png'})).toEqual(true);
        expect(v.validate('photo',{photo:'a name with space.gif'})).toEqual(true);
        expect(v.validate('photo',{photo:'another name.jpeg'})).toEqual(true);
        expect(v.validate('photo',{})).toEqual(true);
        expect(v.validate('photo',{photo:'document.pdf'})).toEqual(false);
        expect(v.validate('photo',{photo:'document'})).toEqual(false);
    });
    test("boel integration", ()=>
    {
        let b = makeBoel();
        let res = b.validate([ b.field('doc').hasExtension("pdf, docx, txt") ], {doc:'myfile.png'});

        //console.log("extension error", res);
        expect(res.has_errors).toBeTruthy();
        res.error_map && expect(res.error_map.doc.validation).toEqual('FileExtension');

        res.error_map && expect(res.error_map.doc.message).not.toEqual('');
    })
});