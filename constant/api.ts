import {
  doc,
  query,
  setDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
  arrayUnion,
  collection,
  onSnapshot,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, fireDB, storage } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  IUser,
  IPosts,
  IFormLog_In,
  IFormSign_up,
  IForm_Create_Update_Post,
} from "@/types";
import { Dispatch, SetStateAction } from "react";

export const validEmail = process.env.NEXT_PUBLIC_EIMAIL_KEY;

export const formateDate = (date: string = ""): string => {
  const seconds: number = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  switch (true) {
    case seconds < 60:
      return `${Math.floor(seconds)} seconds ago`;
    case seconds < 3600:
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    case seconds < 86400:
      const hours = Math.floor(seconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    case seconds < 2592000:
      const days = Math.floor(seconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    case seconds < 31536000:
      const months = Math.floor(seconds / 2592000);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    default:
      const years = Math.floor(seconds / 31536000);
      return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const getUserData = async (
  setUser: Dispatch<SetStateAction<IUser[]>>
) => {
  const user = await query(collection(fireDB, "users"));
  onSnapshot(user, (QuerySnapshot) => {
    let userArray: any = [];
    QuerySnapshot?.forEach((doc) => userArray.push(doc.data()));
    setUser(userArray.sort((a: any, b: any) => b.postsNum - a.postsNum));
  });
};

export const getPostsData = async (
  setPosts: Dispatch<SetStateAction<IPosts[]>>
) => {
  const post = await query(collection(fireDB, "posts"));
  onSnapshot(post, (QuerySnapshot) => {
    let arrayPosts: IPosts[] = [];
    QuerySnapshot.forEach((doc) => {
      arrayPosts.push({ ...(doc.data() as IPosts) });
    });
    setPosts(arrayPosts.sort((a: any, b: any) => b.time - a.time));
  });
};

export const getUserInfoAll = (user: IUser[], userId: string) => {
  const _userInfo = user.find((us) => us.uidUser == userId);
  return { _userInfo };
};
export const handleLogin = async (
  form: IFormLog_In,
  router: any,
  setUserId: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUserEmail: Dispatch<SetStateAction<string>>
) => {
  let { email, password } = form;
  setLoading(true);
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user_SocialMedia", JSON.stringify(result.user.uid));
    setUserEmail("");
    setUserId(result.user.uid);
    router.push("/");
    toast.success("Log in Successfully");
  } catch (error) {
    toast.error("Log In Failed, Please try again.");
  } finally {
    setLoading(false);
  }
};

export const handleSignUp = async (
  form: IFormSign_up & { password: string },
  setForm: Dispatch<SetStateAction<IFormSign_up & { password: string }>>,
  router: any,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUserEmail: Dispatch<SetStateAction<any>>
) => {
  let { name, email, userName, bio, password } = form;
  setLoading(true);
  try {
    const users = await createUserWithEmailAndPassword(auth, email, password);
    setUserEmail(users.user.email);
    const user = {
      bio,
      name,
      email,
      userName,
      postsNum: 0,
      likesMynum: 0,
      following: [],
      followers: [],
      time: Timestamp.now(),
      uidUser: users.user.uid,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    const userRef = collection(fireDB, "users");
    await setDoc(doc(userRef, users.user.uid), user);
    setForm({ name: "", email: "", userName: "", password: "", bio: "" });
    router.push("/log-in");
    toast.success("Sign Up Successfully");
  } catch (err) {
    toast.error("Sign Up Failed, Please try again.");
  } finally {
    setLoading(false);
  }
};

export const handleAddLikes = async (
  ArrLike: IPosts,
  userInf: IUser,
  user: IUser[]
) => {
  try {
    await updateDoc(doc(fireDB, "posts", ArrLike.uidPosts), {
      likes: arrayUnion({
        userIdLike: userInf.uidUser,
        timeLike: Timestamp.now(),
      }),
      countLiked: ++ArrLike.countLiked,
    });

    let usinf = getUserDateToLikes(ArrLike.userId, user);
    let checkId = ArrLike.userId == userInf.uidUser;
    await updateDoc(
      doc(fireDB, "users", checkId ? userInf.uidUser : ArrLike.userId),
      {
        likesMynum: checkId ? ++userInf.likesMynum : ++usinf.likesMynum,
      }
    );
  } catch (error) {
    toast.error("Error adding likes:");
  }
};

const getUserDateToLikes = (id: string, user: IUser[]) =>
  user.find((us) => us.uidUser == id)!;

export const handleRemovelikes = async (
  ArrLike: IPosts,
  userInf: IUser,
  user: IUser[]
) => {
  try {
    let filterLikes = ArrLike.likes?.filter(
      (lik) => lik.userIdLike != userInf.uidUser
    );
    await updateDoc(doc(fireDB, "posts", ArrLike.uidPosts), {
      likes: filterLikes,
      countLiked: --ArrLike.countLiked,
    });

    let usinf = getUserDateToLikes(ArrLike.userId, user);
    let checkId = ArrLike?.userId == userInf?.uidUser;
    await updateDoc(
      doc(fireDB, "users", checkId ? userInf?.uidUser : ArrLike?.userId),
      {
        likesMynum: checkId ? --userInf.likesMynum : --usinf.likesMynum,
      }
    );
  } catch (error) {
    toast.error("Error removing likes:");
  }
};

export const handleAddSaved = async (ArrSaved: IPosts, userId: string) => {
  try {
    await updateDoc(doc(fireDB, "posts", ArrSaved.uidPosts), {
      saved: arrayUnion({ userIdSave: userId, timeSave: Timestamp.now() }),
    });
  } catch (error) {
    toast.error("Error adding post to saved:");
  }
};

export const handleRemoveSaved = async (ArrSaved: IPosts, userId: string) => {
  try {
    let filterSaved = ArrSaved.saved.filter(
      (save) => save.userIdSave !== userId
    );
    await updateDoc(doc(fireDB, "posts", ArrSaved.uidPosts), {
      saved: filterSaved,
    });
  } catch (error) {
    toast.error("Error removing saved:");
  }
};

export const handleSubmitCreatePosts = async (
  form: IForm_Create_Update_Post | any,
  router: any,
  userInf: IUser,
  setForm: Dispatch<SetStateAction<IForm_Create_Update_Post>>,
  setValid: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  let { imgURL, caption } = form;
  let { uidUser, postsNum, name } = userInf;
  const typeImages = /image\/(png|jpg|jpeg|svg|webp)/gi.test(imgURL.type);
  if ((imgURL && caption) != "") {
    if (imgURL?.size > 2 * 1024 * 1024 || !typeImages) {
      toast.error(
        "Image Size should be <= 2MB and type should be (svg, png, jpg)"
      );
      return;
    }
    setValid(true);
    setLoading(true);
    try {
      let uidPosts = crypto.randomUUID();

      const storageRef = ref(storage, `images/${imgURL.name}`);
      const snapshot = await uploadBytesResumable(storageRef, imgURL);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await setDoc(doc(collection(fireDB, "posts"), uidPosts), {
        name,
        caption,
        uidPosts,
        saved: [],
        likes: [],
        countLiked: 0,
        userId: uidUser,
        imgURL: downloadURL,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      });
      await updateDoc(doc(fireDB, "users", uidUser), {
        postsNum: ++postsNum,
      });
      setForm({ imgURL: "", caption: "" });
      router.back();
      toast.success("Added Post Successfully");
      setValid(false);
      setLoading(false);
    } catch (error) {
      toast.error("Oops, Please try again.");
      setValid(false);
      setLoading(false);
    }
  } else {
    toast.error("Please fill all fields");
  }
};

export const handleSubmitUpdatePosts = async (
  imgURL: any,
  caption: string,
  postId: string,
  router: any,
  setForm: Dispatch<SetStateAction<IForm_Create_Update_Post>>,
  refFiles: any,
  setValid: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  if (imgURL && caption) {
    const typeImages = /image\/(png|jpg|jpeg|webp)/gi.test(imgURL.type);
    let typeImgUrl = typeof imgURL == "string";

    if (imgURL.size > 2 * 1024 * 1024 && !typeImages && !typeImgUrl) {
      toast.error(
        "Image Size should be <= 2MB and type should be (svg, png, jpg)"
      );
      return;
    }

    setValid(true);
    setLoading(true);
    try {
      let downloadURL;
      if (typeImages) {
        const storageRef = ref(storage, `images/${imgURL.name}`);
        const snapshot = await uploadBytesResumable(storageRef, imgURL);
        downloadURL = await getDownloadURL(snapshot.ref);
      }
      await updateDoc(doc(fireDB, "posts", postId), {
        caption,
        imgURL: downloadURL || imgURL,
      });
      toast.success("Post Updated Successfully");
      setForm({
        imgURL: "",
        caption: "",
      });
      refFiles.current.value = "";
      router.back();
    } catch (error) {
      toast.error("Error updating post:");
    } finally {
      setValid(false);
      setLoading(false);
    }
  } else {
    toast.error("Please fill all fields");
  }
};

export const handleSubmitUpdateProfile = async (
  form: IFormSign_up,
  posts: IPosts[],
  userId: string,
  router: any,
  setValid: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const { name, email, userName, bio } = form;
  if (!name || !email || !userName || !bio) {
    return toast.error("Please fill all fields");
  } else {
    setLoading(true);
    setValid(true);
    try {
      await updateDoc(doc(fireDB, "users", userId), form);
      posts.forEach(async (arr) => {
        if (userId === arr.userId) {
          await updateDoc(doc(fireDB, "posts", arr.uidPosts), {
            name: form.name,
          });
        }
      });
      toast.success("Profile Updated successfully");
      router.back();
    } catch (err) {
      toast.error("Error updating profile:");
    } finally {
      setLoading(false);
      setValid(false);
    }
  }
};

export const getUserPostsFun = (id: string, posts: IPosts[]) => {
  let _arrAllPostsMy: IPosts[] = [];
  let _arrPostsLikedMy: (IPosts & { timeLike: number })[] = [];
  try {
    posts.forEach((arr) => {
      arr.userId == id && _arrAllPostsMy.push(arr);
      arr.likes.filter(
        (filter) =>
          filter.userIdLike == id &&
          _arrPostsLikedMy.push({ ...arr, ...filter } as any)
      );
    });
  } catch (error) {
    toast.error("Error while retrieving user posts:");
  }
  return { _arrAllPostsMy, _arrPostsLikedMy };
};

export const getDataPost = (posts: IPosts[], post_id: string) => {
  const _post = posts?.find((post) => post.uidPosts == post_id);
  const _allPosts = posts.filter((arr) => arr.userId === _post?.userId);
  return { _post, _allPosts };
};

export const handleNavigate = (
  userIdAll: string,
  userId: string,
  router: any
) =>
  userIdAll == userId
    ? router.push(`/profile/${userId}`)
    : router.push(`/user-info/${userIdAll}`);

export const handleRemovePosts = async (
  router: any,
  userInf: IUser,
  postLength: number,
  post_id: string
) => {
  try {
    await deleteDoc(doc(fireDB, "posts", post_id));
    await updateDoc(doc(fireDB, "users", userInf.uidUser), {
      postsNum: --userInf.postsNum,
      likesMynum: userInf.likesMynum - postLength,
    });
    toast.success("Post deleted");
    router.back();
  } catch (error) {
    toast.error("Failed to delete post, please try again.");
  }
};

export const handleAddFollowing = async (userId: string, uid_User: string) => {
  try {
    await updateDoc(doc(fireDB, "users", uid_User), {
      followers: arrayUnion(userId),
    });

    await updateDoc(doc(fireDB, "users", userId), {
      following: arrayUnion(uid_User),
    });
  } catch (error) {
    toast.error("Error adding following:");
  }
};

export const handleRemoveFollowing = async (
  usInf_users: IUser,
  userId: string
) => {
  try {
    let filterFollowers = usInf_users.followers.filter((arr) => arr !== userId);
    await updateDoc(doc(fireDB, "users", usInf_users.uidUser), {
      followers: filterFollowers,
    });

    let filterFollowing = usInf_users.following.filter(
      (arr) => arr != usInf_users.uidUser
    );
    await updateDoc(doc(fireDB, "users", userId), {
      following: filterFollowing,
    });
  } catch (error) {
    toast.error("Error removing following:");
  }
};
